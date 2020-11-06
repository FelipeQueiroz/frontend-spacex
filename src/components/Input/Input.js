import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
export default function Input({ name, label, dataSelect, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue = "", registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  if (name === "owner_id") {
    return (
      <div style={{ marginBottom: "30px" }}>
        {label && (
          <label style={{ textTransform: "capitalize" }} htmlFor={fieldName}>
            {label}
          </label>
        )}
        <select id="owner_id" name="owner_id" ref={inputRef} {...rest}>
          {dataSelect.map((user) => {
            return (
              <option key={user.id} value={user.id} {...rest}>
                {user.name}
              </option>
            );
          })}
        </select>
        ;
      </div>
    );
  }
  if (name === "body") {
    return (
      <div style={{ marginBottom: "30px" }}>
        {label && (
          <label style={{ textTransform: "capitalize" }} htmlFor={fieldName}>
            {label}
          </label>
        )}

        <textarea
          style={{ height: "7em", maxWidth: "100%" }}
          className="root"
          ref={inputRef}
          id={fieldName}
          defaultValue={defaultValue}
          {...rest}
        />

        {error && <span style={{ color: "#f00" }}>{error}</span>}
      </div>
    );
  }
  return (
    <div style={{ marginBottom: "30px" }}>
      {label && (
        <label style={{ textTransform: "capitalize" }} htmlFor={fieldName}>
          {label}
        </label>
      )}

      <input
        className="root"
        ref={inputRef}
        id={fieldName}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <span style={{ color: "#f00", fontSize: "12px" }}>{error}</span>
      )}
    </div>
  );
}
