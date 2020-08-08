import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import WithErrorHandler from "../withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-order";
import * as burgerBuilderActions from '../../store/actions/index';

import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,

  };

  componentDidMount() {
    // console.log(this.props.ings);
    this.props.onInitIngredients();
  }
  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: {
        name: "Edward Cullen",
        address: {
          street: "TestStreet 1",
          zipCode: "41234",
          country: "England",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({loading: false, purchasing: false});
      })
      .catch((error) => {
        this.setState({loading: false, purchasing: false});
      });
  };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }


    let orderSummary = null;
    // let burger = null;
    let burger = this.props.error? <p>Ingredients can't be loaded!</p> : <Spinner/>;
    if (this.props.ings){
      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.price}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner/>
    // }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded : ingName => dispatch(burgerBuilderActions.addIngredients(ingName)),
    onIngredientRemoved : ingName => dispatch(burgerBuilderActions.removeIngredients(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
