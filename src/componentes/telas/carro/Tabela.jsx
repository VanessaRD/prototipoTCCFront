import { useContext } from "react";
import CarroContext from "./CarroContext";
import Alerta from "../../Alerta";

function Tabela() {

    const { alerta, listaObjetos, remover, setEditar, setObjeto, recuperar, setAlerta } = useContext(CarroContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Listagem de Carros</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
            onClick={ () => {
                setObjeto({placa : "", cor : "" , 
                modelo : "", nomeModelo : "", portao : "", nomePortao : ""});
                setEditar(false);
                setAlerta({status : "", message : ""});
            }}>
                Novo <i className=" bi bibi bi-file-plus" />
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum carro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Placa</th>
                                <th scope="col">ano</th>
                                <th scope="col">cor</th>
                                <th scope="col">modelo</th>
                                <th scope="col">nomeModelo</th>
                                <th scope="col">portao</th>
                                <th scope="col">nomePortao</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.placa}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={ () => {
                                            recuperar(objeto.placa);
                                            setEditar(true);
                                            setAlerta({status : "", message : ""});
                                        }}>
                                            <i className="bi bi-pencil-square" />
                                        </button>
                                        <button className="btn btn-danger" title="Excluir"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-trash3" />
                                        </button>
                                    </td>
                                    <td scope="row">{objeto.placa}</td>
                                    <td>{objeto.ano}</td>
                                    <td>{objeto.cor}</td>
                                    <td>{objeto.modelo}</td>
                                    <td>{objeto.nomeModelo}</td>
                                    <td>{objeto.portao}</td>
                                    <td>{objeto.nomePortao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Tabela;