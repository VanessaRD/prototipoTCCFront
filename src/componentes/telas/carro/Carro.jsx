import { useState, useEffect } from "react";
import CarroContext from "./CarroContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../seguranca/WithAuth";
import Autenticacao from "../../seguranca/Autenticacao";
import { useNavigate } from "react-router-dom";

function Carro() {

    let navigate = useNavigate();
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
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros/${placa}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => response.json())
                .then(data => setObjeto(data))
                .catch(err => setAlerta({ status: "error", message: err }));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros`,
                {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    },
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
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaCarros();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaCarros = async () => {
        try {
            setCarregando(true);
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/carros`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => response.json())
                .then(data => setListaObjetos(data))
                .catch(err => setAlerta({ status: "error", message: err }));
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaModelo = async () => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/modelos`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => response.json())
                .then(data => setListaModelo(data))
                .catch(err => setAlerta({ status: "error", message: err }))
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaPortao = async () => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/portoes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => response.json())
                .then(data => setListaPortao(data))
                .catch(err => setAlerta({ status: "error", message: err }))
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
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
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/carroDelete`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": Autenticacao.pegaAutenticacao().token
                            },
                            body: JSON.stringify(objeto)
                        })
                        .then(response => response.json())
                        .then(json => setAlerta({ status: json.status, message: json.message }))
                        recuperaCarros();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
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

export default WithAuth(Carro);