import { useState, useEffect } from "react";
import CarroContext from "./CarroContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";

function Carro() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        placa: "", ano: "",
        cor: "", modelo: "", portao: ""
    });
    const [listaModelo, setListaModelo] = useState([]);
    const [listaPortao, setListaPortao] = useState([]);
    const [carregando, setCarregando] = useState(true);

    const recuperar = async placa => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros/${placa}`)
            .then(response => response.json())
            .then(data => setObjeto(data))
            .catch(err => setAlerta({ status: "error", message: err }));
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros`,
                {
                    method: metodo,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ status: "error", message: err })
        }
        recuperaCarros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCarros = async () => {
        setCarregando(true);
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros`)
            .then(response => response.json())
            .then(data => setListaObjetos(data))
            .catch(err => setAlerta({ status: "error", message: err }));
        setCarregando(false);
    }

    const recuperaModelo = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/modelos`)
            .then(response => response.json())
            .then(data => setListaModelo(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    const recuperaPortao = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/portoes`)
            .then(response => response.json())
            .then(data => setListaPortao(data))
            .catch(err => setAlerta({ status: "error", message: err }))
    }

    /*const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            await
                fetch(`${process.env.REACT_APP_ENDERECO_API}/carros/${objeto.placa}`,
                    { method: "DELETE" })
                    .then(response => response.json())
                    .then(json => setAlerta({ status: json.status, message: json.message }))
            recuperaCarros();
        }
    }*/

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {

            await fetch(`${process.env.REACT_APP_ENDERECO_API}/carroDelete`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(objeto)
                })
                .then(response => response.json())
                .then(json => setAlerta({ status: json.status, message: json.message }))

            recuperaCarros();
        }
    }

    useEffect(() => {
        recuperaCarros();
        recuperaModelo();
        recuperaPortao();
    }, []);

    return (
        <CarroContext.Provider value={{
            alerta, setAlerta,
            listaObjetos, setListaObjetos,
            recuperaModelo, recuperaPortao, remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar, acaoCadastrar,
            handleChange, listaModelo, listaPortao
        }}>
            {!carregando ? <Tabela /> : <Carregando />}
            <Form />
        </CarroContext.Provider>
    )

}

export default Carro;