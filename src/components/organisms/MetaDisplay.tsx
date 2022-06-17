import { Stack, Paper } from "@mui/material";

import { Meta } from "../molecules/Meta";

import { useGet } from "../../hooks/api";

const url = "https://krat.es";
const id = "04b47993d88d3148e8ac";

const MetaDisplay: React.FC = () => {
  const { data } = useGet<{
    krateSize: number;
    totalRecords: number;
    updatedAt: Date;
  }>(`${url}/meta/${id}`);

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
