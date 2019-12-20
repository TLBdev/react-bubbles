import React, { useState } from "react";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { Formik, Form, Field } from 'formik'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, checker, setChecker }) => {

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color)
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => setChecker(++checker))
      .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => setChecker(++checker))
      .catch(err => console.log(err))
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <Formik
        initialValues={{
          color: "",
          code: ''
        }}
        onSubmit={values => {
          axiosWithAuth()
            .post('/colors', { color: values.color, code: { hex: values.code }, id: Date.now() })
            .then(res => setChecker(++checker))
            .catch(err => { console.log(err) })
        }}>
        <Form>
          <Field type='text' name='color'></Field>
          <Field type='text' name='code'></Field>

          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ColorList;
