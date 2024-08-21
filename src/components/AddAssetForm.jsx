import { useContext, useRef, useState } from "react";
import { useCrypto } from "../context/cryptoContext";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import CoinInfo from "./CoinInfo";
import { FirebaseContext } from "../context/firebase/firebaseContext";

const validateMessages = {
  required: "${label}' is required!",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assRef = useRef();

  const firebase = useContext(FirebaseContext);

  const [form] = Form.useForm();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset added!"
        subTitle={`Added ${assRef.current.amount} of ${coin.name} by price ${assRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder="Select coin"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />
    );
  }

  function onFinish(values) {
    const newAsset = {
      ...coin,
      amount: values.amount,
      price: values.price,
      date: new Date(),
    };
    assRef.current = newAsset;
    setSubmitted(true);
    firebase.addAsset(newAsset);
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(3),
    });
  }

  // function handlePriceChange(value) {
  //   const amount = form.getFieldValue("amount");
  //   form.setFieldsValue({
  //     total: +(value * amount).toFixed(3),
  //   });
  // }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      className="drawer__add-asset-form"
      initialValues={{
        price: +coin.price.toFixed(3),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          className="add-asset-form__input"
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber
          // onChange={handlePriceChange}
          disabled
          className="add-asset-form__input"
        />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime disabled className="add-asset-form__input" />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled className="add-asset-form__input" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="add-asset-form__button-add"
        >
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}
