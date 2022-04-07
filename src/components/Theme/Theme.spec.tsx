import Theme from "./Theme";

describe("Theme", () => {
  const theme = Theme;

  it("Has the property 'palette'", () => {
    expect(theme).toHaveProperty("palette");
  });

  it("Has the property 'mode' on the object 'palette'", () => {
    expect(theme.palette).toHaveProperty("mode");
  });

  it("Has the property 'primary' on the object 'palette'", () => {
    expect(theme.palette).toHaveProperty("primary");
  });

  it("Has the property 'secondary' on the object 'palette'", () => {
    expect(theme.palette).toHaveProperty("secondary");
  });
});
