import {
  Button,
  Card,
  CheckBox,
  FlexChild,
  FlexLayout,
  PageHeader,
  Popover,
  Select,
  TextField,
  TextStyles,
} from "@cedcommerce/ounce-ui";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../../services/request/Request";
import AppRegistrationCss from "./AppRegistration.module.css";

const AppRegistration = () => {
  const navigate = useNavigate();
  const [webHookOptions, setWebHookOptions] = useState<string[]>([]);
  const [popOverActive, setPopOverActive] = useState<boolean>(false);
  const opt = [
    {
      label: "hours",
      value: "0",
    },
    {
      label: "minutes",
      value: "0",
    },
  ];

  const getAllWebHooks = () => {
    const url = `http://remote.local.cedcommerce.com/webapi/rest/v1/marketplaceswebhooks`;
    const response = get(url);
    response.then((res) => {
      console.log("getAllWebHooks", res);
      if (res.success) {
        setWebHookOptions(res.Webhooks.shopify);

        let webHooksArray = [...res.Webhooks.shopify];
        webHooksArray.forEach((object: any) => {
          object["checked"] = false;
        });
        console.log("webHooksArray", webHooksArray);
        setWebHookOptions(webHooksArray);
      }
    });
  };
  useEffect(() => {
    getAllWebHooks();
  }, []);

  const getAllSelectedWebHookOptions = (checkedIndex: number) => {
    const temp = [...webHookOptions];
    temp &&
      temp.map((object: any, indx: number) => {
        if (checkedIndex === indx) object.checked = !object.checked;
      });
    setWebHookOptions(temp);
  };

  return (
    <>
      {/* <PageHeader
        action={
          <Button
            content="Back"
            type="Primary"
            onClick={() => navigate("/panel/apps")}
          />
        }
        title="Create App"
      /> */}

      {/* <FlexLayout desktopWidth="100" direction="vertical" spacing="extraLoose"> */}
      <FlexLayout halign="end">
        <Select
          // name="MarketPlaces"
          onChange={function noRefCheck() {}}
          options={[
            {
              group: [
                {
                  label: "Option 0.1",
                  value: "0.1",
                },
                {
                  label: "Option 0.2",
                  value: "0.2",
                },
              ],
              label: "This is your Heading 0",
              value: "0",
            },
            {
              group: [
                {
                  label: "Option 1.1",
                  value: "1.1",
                },
                {
                  label: "Option 1.2",
                  value: "1.2",
                },
              ],
              label: "This is your Heading 1",
              value: "1.0",
            },
            {
              group: [
                {
                  label: "Option2",
                  value: "2",
                },
                {
                  label: "Option3",
                  value: "3",
                },
                {
                  label: "Option4",
                  value: "4",
                },
                {
                  label: "Option5",
                  value: "5",
                },
                {
                  label: "Option6",
                  value: "6",
                },
                {
                  label: "Option7",
                  value: "7",
                },
                {
                  label: "Option8",
                  value: "8",
                },
              ],
              label: "Collection Of headings",
              value: "2.0",
            },
          ]}
          placeholder="Select MarketPlace"
          popoverContainer="body"
          thickness="thick"
        />
      </FlexLayout>
      <hr />
      <Card>
        <FlexLayout desktopWidth="50">
          <FlexChild>
            <Card extraClass={AppRegistrationCss.cardPlain} cardType="Bordered">
              <TextStyles content="General details" fontweight="extraBolder" />
              <TextStyles
                content="Enter the default details for your App.."
                fontweight="light"
              />
            </Card>
          </FlexChild>
          <FlexChild>
            <Card cardType="Shadowed">
              <FlexLayout direction="vertical" spacing="loose">
                <TextField placeHolder="App Name" />
                <TextField placeHolder="App Location" />
                <Select placeholder="Select App Status" />
                <TextField placeHolder="Additional Data (optional)" />
                <TextField placeHolder="Group Code" />
                <TextField placeHolder="App Code" />
                <TextField placeHolder="MarketPlace Handler" />

                <FlexLayout spacing="extraTight">
                  <FlexChild desktopWidth="">
                    <TextField placeHolder="Enter quantity" type="number" />
                  </FlexChild>
                  <FlexChild desktopWidth="">
                    <Select placeholder="Durations:" options={opt}></Select>
                  </FlexChild>
                </FlexLayout>
                <Select placeholder="Webhook"></Select>
                <FlexLayout spacing="loose">
                  <Popover
                    activator={
                      <Button
                        onClick={() => {
                          setPopOverActive(!popOverActive);
                        }}
                        length="fullBtn"
                        type="Secondary"
                      >
                        Select Webhook
                      </Button>
                    }
                    // dropDownheight={300}
                    onClose={function noRefCheck() {}}
                    popoverContainer="body"
                    popoverWidth={250}
                    open={popOverActive}
                  >
                    <FlexLayout direction="vertical" spacing="loose">
                      {webHookOptions &&
                        webHookOptions.map((item: any, index: number) => {
                          return (
                            <CheckBox
                              key={index}
                              // description="Checkbox Descripion"
                              id={item.code}
                              labelVal={item.topic}
                              name="Name"
                              onClick={() =>
                                getAllSelectedWebHookOptions(index)
                              }
                              checked={item.checked}
                            />
                          );
                        })}
                    </FlexLayout>
                  </Popover>
                </FlexLayout>
              </FlexLayout>
            </Card>
          </FlexChild>
        </FlexLayout>
      </Card>

<Card title={"dbgfhgsd"}>
  <FlexLayout desktopWidth="50">
    <TextStyles>1</TextStyles>
    <TextStyles>2</TextStyles>
  </FlexLayout>
</Card>
      <hr />

      <FlexLayout halign="fill">
        <FlexChild desktopWidth="25">
          <Card cardType="Bordered">
            <TextStyles fontweight="extraBolder" content="App Details" />
            <TextStyles
              fontweight="light"
              content="Enter the your App credentials."
            />
          </Card>
        </FlexChild>
        <FlexChild desktopWidth="75">
          <Card cardType="Shadowed">
            <FlexLayout spacing="extraLoose">
              <FlexChild desktopWidth="">
                <TextStyles fontweight="bold" content="app_key" />
              </FlexChild>
              <FlexChild desktopWidth="">
                <TextField placeHolder="value" type="text" value="" />
              </FlexChild>
            </FlexLayout>
          </Card>
        </FlexChild>
      </FlexLayout>
      <hr />

      <FlexLayout>
        <FlexChild desktopWidth="25">
          <Card cardType="Plain">
            <TextStyles fontweight="extraBolder" content="Sandbox details" />
            <TextStyles
              fontweight="light"
              content="Enter the your App Sandbox credentials."
            />
          </Card>
        </FlexChild>
        <FlexChild desktopWidth="75">
          <Card cardType="Shadowed">
            <FlexLayout spacing="extraLoose">
              <FlexChild desktopWidth="33">
                <TextStyles fontweight="bold" content="app_key" />
              </FlexChild>
              <FlexChild desktopWidth="66">
                <TextField placeHolder="value" value="" />
              </FlexChild>
            </FlexLayout>
          </Card>
        </FlexChild>
      </FlexLayout>
      {/* </FlexLayout> */}
    </>
  );
};

export default AppRegistration;