import { useContext } from 'react'
import PortaoContext from './PortaoContext';
import Alerta from '../../Alerta';

function Tabela() {

    const { setObjeto, alerta, setAlerta, listaObjetos, remover, setEditar, recuperar } = useContext(PortaoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Listagem de Portões</h1>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicaoPortao"
                onClick={() => {
                    setObjeto({ codigo: 0, nome: ""});
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className=" bi bibi bi-file-plus" />
            </button>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhum portão encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.codigo}>
                                    <td align="center">
                                        <button className="btn btn-info" title="Editar"
                                            data-bs-toggle="modal" data-bs-target="#modalEdicaoPortao"
                                            onClick={() => {
                                                recuperar(objeto.codigo);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square" />
                                        </button>
                                        <button className="btn btn-danger" title="Excluir"
                                            onClick={() => remover(objeto)}>
                                            <i className="bi bi-trash3" />
                                        </button>
                                    </td>
                                    <td scope="row">{objeto.codigo}</td>
                                    <td>{objeto.nome}</td>
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