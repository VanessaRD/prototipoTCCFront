import { useContext } from 'react'
import Alerta from '../../Alerta';
import PortaoContext from './PortaoContext';
import Input from '../../comuns/Input';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta } = useContext(PortaoContext);

    return (
        <div className="modal fade" id="modalEdicaoPortao" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edição de Portões</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form type="sumbit" onSubmit={acaoCadastrar}
                        className="needs-validation" noValidate>
                        <div className="modal-body">
                            <Alerta alerta={alerta} />
                            <div className="mb-3">
                                <label htmlFor="txtCodigo" className="form-label">Código</label>
                                <input type="number" className="form-control"
                                    id="txtCodigo" readOnly name="codigo" value={objeto.codigo}
                                    onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <Input label="Nome" id="txtNome" type="text" name="nome"
                                    Context={PortaoContext}/>                                
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="submit" className="btn btn-primary" >Salvar
                                <i className="bi bi-save" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Form;