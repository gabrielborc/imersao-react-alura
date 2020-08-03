import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';
import config from '../../../config';

function CadastroCategoria() {
  const valoresIniciais = {
    titulo: '',
    descricao: '',
    cor: '',
  };

  const { handleChange, values, clearForm } = useForm(valoresIniciais);

  const [categorias, setCategorias] = useState([]);

  const handleAddCategoria = (event) => {
    event.preventDefault();

    setCategorias([
      ...categorias,
      values,
    ]);

    clearForm(valoresIniciais);
  };

  useEffect(() => {
    (async () => {
      const URL = `${config.URL_BACKEND_TOP}/categorias`;

      const respostaDoServer = await fetch(URL);

      if (respostaDoServer.ok) {
        const resposta = await respostaDoServer.json();
        setCategorias(resposta);
        return;
      }

      throw new Error('Não foi possível pegar os dados');
    })();
  }, []);

  return (
    <PageDefault>
      <h1>
        Cadastro de CadastroCategoria
        {values.nome}
      </h1>

      <form onSubmit={handleAddCategoria}>
        <FormField
          label="Título da Categoria"
          type="text"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="Descrição"
          type="textarea"
          name="descricao"
          value={values.descricao}
          onChange={handleChange}
        />

        <FormField
          label="Cor"
          type="color"
          name="cor"
          value={values.cor}
          onChange={handleChange}
        />

        <Button type="submit">
          Cadastrar
        </Button>
      </form>

      {!categorias.length && (
        <div>
          Loading...
        </div>
      )}

      <ul>
        {categorias.map((categoria) => (
          <li key={categoria}>{categoria.titulo}</li>
        ))}
      </ul>

      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
