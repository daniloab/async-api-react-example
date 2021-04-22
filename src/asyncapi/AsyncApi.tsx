import React from "react";
import AsyncApiComponent from "@asyncapi/react-component";

import asyncapi from "./asyncapi.json";

const AsyncApi = () => {
  return <AsyncApiComponent schema={asyncapi} />;
};

export default AsyncApi;
