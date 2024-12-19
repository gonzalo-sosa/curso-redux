import StoreContext from "../context/storeContext";

class Bugs extends Component {
  static contextType = StoreContext;
  
  state = { bugs: []}

  componentDidMount() {
    const store = this.context

    store.suscribe(() => {
      const bugsInStore = store.getState().entities.bugs.list;

      if(this.state.bugs !== bugsInStore)
        this.setState({ bugs: bugsInStore })
    })
  }

  

  render() { 
    return (<div>Bugs</div>);
  }
}
 
export default Bugs;