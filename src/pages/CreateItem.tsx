import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Page } from "../components/templates/Page";
import { CreateItem as CreateItemForm } from "../components/organisms/CreateItem";

import Header from "../components/Header/Header";

import InventoryItem from "../types/InventoryItem";

const url = "https://krat.es";
const id = "04b47993d88d3148e8ac";

const CreateItem = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/");
  };

  const handleCreate = async (item: {
    serial: string;
    description: string;
    count: number;
  }) => {
    const getResponse = await axios.get<[]>(
      `${url}/${id}/items?query=serial:${item.serial}&limit=1`
    );

    if (getResponse.data.length > 0) throw new Error("Item already exists");

    const postResponse = await axios.post(`${url}/${id}/items`, item);

    if (postResponse.status === 200) {
      console.log("Item created");
      navigate("/");
    } else {
      throw new Error("Failed to create item");
    }
  };

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <CreateItemForm
          handleCancel={handleCancel}
          handleConfirm={handleCreate}
        />
      </Page>
    </>
  );
};

export { CreateItem };
