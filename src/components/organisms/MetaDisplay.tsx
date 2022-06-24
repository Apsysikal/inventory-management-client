import { useEffect, useState } from "react";
import { Stack, Paper } from "@mui/material";

import { Meta } from "../molecules/Meta";

import { getMeta } from "../../service/meta";

const MetaDisplay: React.FC = () => {
  const [data, setData] = useState<{
    krateSize: number;
    totalRecords: number;
    updatedAt: Date;
  }>();

  useEffect(() => {
    async function getData() {
      const { data } = await getMeta();
      setData(data);
    }

    getData();
  }, []);

  return (
    <Stack component={Paper} style={{ padding: 5 }}>
      <Meta
        title="Database Size"
        text={`${data ? data.krateSize / 1000 : "..."} kB`}
      />
      <Meta
        title="Inidvidual Items Stored"
        text={`${data?.totalRecords || "..."}`}
      />
      <Meta
        title="Last Updated"
        text={`${data ? new Date(data.updatedAt).toLocaleString() : "..."}`}
      />
    </Stack>
  );
};

export { MetaDisplay };
