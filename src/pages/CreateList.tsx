import { useNavigate } from "react-router-dom";

import { Page } from "../components/templates/Page";
import { CreateList as CreateListForm } from "../components/organisms/CreateList";
import Header from "../components/organisms/Header";
import { useAccount } from "../hooks/useAccount";
import { createList } from "../service/list";

const CreateList = () => {
  const account = useAccount();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1 as any);
  };

  const handleCreate = async (list: { title: string; description: string }) => {
    console.debug("Handling create list click");
    if (!account) return;

    const postResponse = await createList(list, {
      headers: {
        Authorization: `Bearer ${account.tokens.accessToken}`,
      },
    });

    console.debug(postResponse);

    if (postResponse.status === 201) {
      console.log("List created");
      navigate(-1);
    } else {
      throw new Error("Failed to create list");
    }
  };

  return (
    <>
      <Header titleText="Inventory Management" />
      <Page>
        <CreateListForm
          disableConfirm={!account}
          handleCancel={handleCancel}
          handleConfirm={handleCreate}
        />
      </Page>
    </>
  );
};

export { CreateList };
