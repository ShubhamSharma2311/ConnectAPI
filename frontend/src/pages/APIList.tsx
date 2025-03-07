import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { apiState } from "../recoil/atoms/apiatoms";
import APIcard from "../components/APIcard";
import axios from "axios";

const APIList: React.FC = () => {
  const [apis, setApis] = useRecoilState(apiState);

  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const response = await axios.get("/api/apis");
        setApis(response.data);
      } catch (error) {
        console.error("Error fetching APIs:", error);
      }
    };

    fetchAPIs();
  }, [setApis]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Explore APIs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {apis.map((api) => (
          <APIcard key={api._id} {...api} />
        ))}
      </div>
    </div>
  );
};

export default APIList;
