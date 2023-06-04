import React from "react";
import { Form } from "react-bootstrap";
import Button from "../Button/Button";

function MultiInputs({ techLists, setTechLists }) {
  const handleClickPlus = () => {
    return setTechLists([...techLists, ""]);
  };
  const handleClickMinus = (prevIndex) => {
    const updatedInputFields = techLists.filter((item, i) => prevIndex !== i);
    return setTechLists(updatedInputFields);
  };

  const handleChange = (value, currentIndex) => {
    const newTechList = techLists.map((item, itemIndex) => {
      return currentIndex === itemIndex ? value : item;
    });
    return setTechLists(newTechList);
  };

  return (
    <Form.Group>
      <Form.Label style={{ display: "flex", justifyContent: "space-between" }}>
        Tech Lists:{" "}
        <div style={{ width: "30px" }}>
          <Button setBackground Padding="5px" Func={handleClickPlus}>
            +
          </Button>
        </div>
      </Form.Label>
      {techLists.map((item, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Control
              type="text"
              value={item}
              autoFocus={techLists.length > 1 ? true : false}
              style={{ marginTop: "5px" }}
              onChange={(e) => handleChange(e.target.value, index)}
              placeholder="Tech Used in the project"
              required
            />
            {index !== 0 && (
              <div style={{ width: "40px", marginLeft: "5px" }}>
                <Button
                  setBackground
                  Padding="12px"
                  Func={() => handleClickMinus(index)}
                >
                  -
                </Button>
              </div>
            )}
          </div>
        );
      })}
    </Form.Group>
  );
}

export default MultiInputs;
