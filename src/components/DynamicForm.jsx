import React , { Fragment } from 'react';
// ui
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const getFormType = (type) => {
  switch (type) {
    case 'string':
      return 'text';
    default:
      return 'text';
  }
}

const DynamicForm = ({param}) => {
  const { name } = param
  if (param.in === 'body') {
    const { properties } = param.schema
    return (
      <FormGroup>
        <Label>{name}</Label>
        {Object.keys(properties).map((label, key) => (
          <Fragment key={key}>
            <Label>{label}</Label>
            <Input type={getFormType(properties[label].type || '')} name={label} />
          </Fragment>
        ))}
      </FormGroup>
    )
  }
  return (
    <FormGroup>
      <Label for={name}>{name}</Label>
      <Input type="text" name={name} id={name} placeholder="with a placeholder" />
    </FormGroup>
  )
}

export default ({method, item}) => (
  <Col>
    <Card>
      <CardBody>
        <CardTitle>Method: {method}</CardTitle>
        <p>{item.description}</p>
        {
          item.parameters && item.parameters.length > 0 ? (
              <Form>
                {item.parameters.map((param, key) => {
                  return <DynamicForm param={param} key={key} />
                })}
                <Button type="submit">Submit</Button>
              </Form>
            ):
            <div />
        }
      </CardBody>
    </Card>
  </Col>
)