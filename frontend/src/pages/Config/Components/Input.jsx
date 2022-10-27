import React, { useState, useEffect } from "react";

const Search = ({ list }) => {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleChange = (event) => {
    let input = event.target.value;
    setQuery({
      ...query,
      [event.target.name]: input.trim(),
    });
    // console.log(input);

    input.length === 0 || input === ""
      ? setFilteredList(list)
      : setFilteredList(
          list.filter(
            (item) =>
              item.name
                .trim()
                .toLowerCase()
                .includes(input.trim().toLowerCase()) ||
              item.email.toLowerCase().includes(input.trim().toLowerCase())
          )
        );
  };

  return (
    <div className="search">
      <label>
        Search
        <input type="text" name="query" onChange={handleChange} />
      </label>
      {filteredList.length > 0 && <Table list={filteredList} />}
    </div>
  );
};

const Items = ({ item }) => {
  const { name, gender, email } = item;
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{email}</td>
      </tr>
    </tbody>
  );
};

const Table = ({ list }) => {
  // console.log(filteredList);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
        </tr>
      </thead>
      {list.map((item) => (
        <Items key={item.name} item={item} />
      ))}
    </table>
  );
};

const initialItem = {
  name: "",
  gender: "",
  email: "",
};

const Form = () => {
  const [currentItem, setCurrentItem] = useState(initialItem);
  const [list, setList] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = currentItem;

    setList([...list, newItem]);
    setCurrentItem(initialItem);
    event.target.reset();
  };

  const handleChange = (event) => {
    setCurrentItem({
      ...currentItem,
      [event.target.name]: event.target.value.trim(),
    });
  };

  // console.log(list);

  const disabled =
    currentItem.name === "" || currentItem.gender === "" ? true : false;
  // console.log(disabled)

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
        </label>
        <select name="gender" onChange={handleChange} defaultValue="Gender">
          <option disabled>Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={disabled}>
          Save
        </button>
      </form>
      <Search list={list} />
      {/* <Table list={list} /> */}
    </>
  );
};

function App() {
  return (
    <>
      <h1 className="SearchableTable">Searchable Table</h1>
      <Form />
    </>
  );
}

export default App;