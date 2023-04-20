import { useContext } from "react";
import Alerta from "../../Alerta";
import CarroContext from "./CarroContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";
import CampoSelect from "../../comuns/CampoSelect";

function Form() {

    const { objeto, handleChange, acaoCadastrar,
        alerta, listaModelo, listaPortao } = useContext(CarroContext);

    return (
        <Dialogo id="modalEdicao" titulo="Edição de Carros"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtPlaca" label="Placa" tipo="text"
                name="placa" value={objeto.placa} onchange={handleChange}
                requirido={false} msgvalido="Placa OK"
                msginvalido="Informe a Placa" readonly={false}
                maxCaracteres={7} />
            <CampoEntrada id="txtAno" label="Ano" tipo="number"
                name="ano" value={objeto.ano} onchange={handleChange}
                requirido={true} msgvalido="Ano OK"
                msginvalido="Informe o Ano" readonly={false}
                maxCaracteres={5} />
            <CampoEntrada id="txtCor" label="Cor" tipo="text"
                name="cor" value={objeto.cor} onchange={handleChange}
                requirido={true} msgvalido="Cor OK"
                msginvalido="Informe a cor" readonly={false}
                maxCaracteres={40} />
           
            <CampoSelect id="selecModelo" label="Modelo" 
                name="modelo" value={objeto.modelo} onchange={handleChange}
                requirido={true} msgvalido="Modelo OK"
                msginvalido="Selecione o Modelo">
                {
                    listaModelo.map((mod) => (
                        <option key={mod.codigo} value={mod.codigo}>
                            {mod.nome}
                        </option>
                    ))
                }          
            </CampoSelect>
            <CampoSelect id="selecPortao" label="Portao" 
                name="portao" value={objeto.portao} onchange={handleChange}
                requirido={true} msgvalido="Portão OK"
                msginvalido="Selecione o Portão">
                {
                    listaPortao.map((port) => (
                        <option key={port.codigo} value={port.codigo}>
                            {port.nome}
                        </option>
                    ))
                }          
            </CampoSelect>
        </Dialogo>
    )

}

export default Form;