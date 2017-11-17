import React from "react";
import { render } from "react-dom";
import "./App.css";

class ItemEditor extends React.Component {
  constructor(props) {
    super(props);


    this.changeProperty = this.changeProperty.bind(this);
  }


  changeProperty(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    });
    this.props.updateItem(this.props.item, ev.target);
  }

  render() {
    return (
      <div>
        <br />
        <div>
          <label htmlFor="">Titulo</label><br />
          <input
            type="text"
            name="title"
            value={this.props.item.title}
            onChange={this.changeProperty}
          />
        </div>
        <div>
          <label htmlFor="">Link</label><br />
          <input
            type="text"
            name="link"
            value={this.props.item.link}
            onChange={this.changeProperty}
          />
        </div>

      </div>
    );
  }
}

class Item extends React.Component {
  render() {
    let active = 0;
    if (this.props.active) {
      if (this.props.active.id === this.props.item.id) {
        active = 1;
      }
    }
    return (
      <div
        className={active ? " active item" : "item"}
        
        data-id={this.props.item.id}
        onClick={this.props.editItem}
      >
        label {this.props.item.id}: {this.props.item.title}
      </div>
    );
  }
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditor: false,
      activeItem: null,
      items: this.props.items
    };
    this.editItem = this.editItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
  }

  editItem(ev) {
    ev.persist();

    // this.setState({
    //     showEditor: false,
    //     activeItem: null
    // });

    this.props.items.forEach(item => {
      if (item.id === parseInt(ev.target.getAttribute("data-id"), 10)) {
        this.setState({
          activeItem: item,
          showEditor: true
        });
      }
    });
  }

  updateItem(node, target) {
    console.log(target.name);
    let tempItems = this.state.items;
    tempItems.forEach(item => {
      if (item.id === node.id) {
        item[target.name] = target.value;
      }
    });
    this.setState({
      items: tempItems
    });
  }

  render() {
    return (
      <div>
        {this.state.items.map(item => (
          <Item
            key={"key-" + item.id}
            item={item}
            active={this.state.activeItem}
            editItem={this.editItem}
          />
        ))}
        {this.state.showEditor ? (
          <ItemEditor
            item={this.state.activeItem}
            key={'editor' + this.state.activeItem.id}
            updateItem={this.updateItem}
          />
        ) : (
            ""
          )}
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    let items = [
      {
        id: 1,
        title: "title-1",
        link: "#"
      },
      {
        id: 2,
        title: "title-2",
        link: "#"
      },
      {
        id: 3,
        title: "title-3",
        link: "#"
      },
      {
        id: 4,
        title: "title-4",
        link: "#"
      }
    ];
    return (
      <div>
        <ItemList items={items} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
