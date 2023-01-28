import { useContext, useState, useEffect } from "react";
import Context from "../Context";
import axios from "axios";

export default function Home() {
  const { setUsuario: setUsuarioGlobal } = useContext(Context);

  const [usuario, setUsuarioLocal] = useState([{}]);

  const getUsuarioData = async () => {
    const urlServer = "http://localhost:3000";
    const endpoint = "/usuarios";
    const token = localStorage.getItem("token");

    try {
      const { data } = await axios.get(urlServer + endpoint, {
        headers: { Authorization: "Bearer " + token },
      });
      setUsuarioGlobal(data);
      setUsuarioLocal(data);      
    } catch ({ response: { data: message } }) {
      alert(message + " 🙁");
      console.log(message);
    }
  };

  useEffect(() => {
    getUsuarioData();
  },[]);

  return (
    <div className="py-5">
      {usuario.map((e) =><><h1>
        Bienvenido <span className="fw-bold">{e.email}</span>
      </h1>
      <h3>
        {e.rol} en {e.lenguage}
      </h3></> )}
      
    </div>
  );
}
