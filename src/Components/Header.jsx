import React from "react";
import { getUser } from "../services/userAPI";
import LoadingText from "./LoadingText";

class Header extends React.Component {
  state = {
    name: "",
    loading: false, 
  };

  showUser = async () => {
    this.setState({
        loading:true, 
    })
    const user = await getUser();
    this.setState({
        name:user.name,
        loading:false, 
    })
  }

   componentDidMount() {
    this.showUser();
  }

  render() {
    const {name, loading} = this.state;
    return (
    <header data-testid="header-component">
        <h3 data-testid="header-user-name">{name}</h3>
        {loading && <LoadingText/>}
    </header>
    );
  }
}

export default Header;
