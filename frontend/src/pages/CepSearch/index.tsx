import ResultCard from "components/ResultCard";
import { useState } from "react";
import axios from "axios";
import { Image } from "types/image";

import "./styles.css";

type FormData = {
  login: string;
};

type Address = {
  blog: string;
  followers: string;
  location: string;
  name: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();
  const [image, setImage] = useState<Image>();
  const [formData, setFormData] = useState<FormData>({
    login: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
 
    axios
      .get(`https://api.github.com/users/${formData.login}`)
      .then((response) => {
        setAddress(response.data);
        setImage(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        setImage(undefined);
        console.log(error);
      });   
    }
  return (
    <div className="cep-search-container">
      <div className="container search-container">
        <h1>Encontre um perfil github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="login"
              value={formData.login}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
         
        {address && (
       <div className="container result-card-container">     
          <div className="img-container">
            <img src={image?.avatar_url} alt="" />
          </div>      
          <div className="info-container">          
              <h2>Informações</h2>
              <>
              <ResultCard title="Perfil:" description={address.blog} />
              <ResultCard title="Seguidores:" description={address.followers} />
              <ResultCard title="Localidade:" description={address.location} />
              <ResultCard title="Nome:" description={address.name} />
              </>
          </div>       
       </div>
         )}  
    </div>
  );
};

export default CepSearch;
