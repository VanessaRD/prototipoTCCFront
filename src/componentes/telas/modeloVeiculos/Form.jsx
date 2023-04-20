import { useContext } from 'react'
import Alerta from '../../Alerta';
import ModeloContext from './ModeloContext';
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objeto, handleChange, acaoCadastrar,
        alerta } = useContext(ModeloContext);

    return (
        <Dialogo id="modalEdicao" titulo="Edição de Modelo de Veículos"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Codigo" tipo="number"
                name="codigo" value={objeto.codigo} onchange={handleChange}
                requirido={false} msgvalido=""
                msginvalido="" readonly={true}
                maxCaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome} onchange={handleChange}
                requirido={true} msgvalido="Nome OK"
                msginvalido="Informe o nome" readonly={false}
                maxCaracteres={40} />
        </Dialogo>
    )

}

export default Form;