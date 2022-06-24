import { useNavigate } from "react-router-dom";

import { Page } from "../components/templates/Page";
import { CreateItem as CreateItemForm } from "../components/organisms/CreateItem";
import Header from "../components/Header/Header";

import { getItems, createItem } from "../service/item";

const CreateItem = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1 as any);
  };

  const handleCreate = async (item: {
    serial: string;
    description: string;
    count: number;
  }) => {
    const getResponse = await getItems({
      query: `serial:${item.serial}`,
      limit: 1,
    });

    if (getResponse.data.length > 0) throw new Error("Item already exists");

    const postResponse = await createItem(item);

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
