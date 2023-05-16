async function buscaEndereco(cep) {
  let mensagemDeErro = document.querySelector('[data-tipo="erro"]')
    mensagemDeErro.innerHTML = ""
  try {
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const consultaJSON = await consultaCEP.json();
    if (consultaJSON.erro) {
      throw Error("Esse CEP não existe!");
    }
    console.log(consultaJSON);
    const endereco = document.querySelector('[data-tipo="endereco"]');
    const complemento = document.querySelector('[data-tipo="complemento"]');
    const bairro = document.querySelector('[data-tipo="bairro"]');
    const cidade = document.querySelector('[data-tipo="cidade"]');

    endereco.value = consultaJSON.logradouro;
    complemento.value = consultaJSON.complemento;
    bairro.value = consultaJSON.bairro;
    cidade.value = consultaJSON.localidade;
    
    return consultaJSON;
  } catch (erro) {
    mensagemDeErro.innerHTML = `<p>CEP inválido, por favor tente novamente.</p>`
    console.log(erro);
    
  }
}

const CEP = document.querySelector('[data-tipo="cep"]');
CEP.addEventListener("focusout", () => buscaEndereco(CEP.value));


