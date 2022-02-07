import React from "react";

const PersonForm = ({
  handleNameChange,
  newName,
  handleNumberChange,
  newNumber,
  handleAdd,
}) => {
  return (
    <form>
      <div>
        Name: <input onChange={handleNameChange} value={newName} />
      </div>
      <div>
        Number: <input onChange={handleNumberChange} value={newNumber} />
      </div>
      <div>
        <button type="submit" onClick={handleAdd}>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
