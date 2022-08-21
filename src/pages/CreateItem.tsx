import { useNavigate, useParams } from "react-router-dom";

import { Page } from "../components/templates/Page";
import { CreateItem as CreateItemForm } from "../components/organisms/CreateItem";
import Header from "../components/organisms/Header";
import { useAccount } from "../hooks/useAccount";

import { getItems, createItem } from "../service/item";

const CreateItem = () => {
  const account = useAccount();
  const { listId } = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1 as any);
  };

  const handleCreate = async (item: {
    serial: string;
    description: string;
    count: number;
  }) => {
    if (!account) return;
    if (!listId) return;

    const getResponse = await getItems({
      list: listId,
      query: `serial:${item.serial}`,
      limit: 1,
    });

    if (getResponse.data.length > 0) throw new Error("Item already exists");

    const modifiedItem = { ...item, list: listId };
    console.debug(modifiedItem);

    const postResponse = await createItem(modifiedItem, {
      headers: {
        Authorization: `Bearer ${account.tokens.accessToken}`,
      },
    });

    if (postResponse.status === 201) {
      console.log("Item created");
      navigate(-1);
    } else {
      throw new Error("Failed to create item");
    }
  };

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <CreateItemForm
          disableConfirm={!account}
          handleCancel={handleCancel}
          handleConfirm={handleCreate}
        />
      </Page>
    </>
  );
};

export { CreateItem };
