import React, { useState } from "react";

import AddressItem from 'components/Address/AddressItem';

function AddressInput(props) {

  return(
    <div>
      <AddressItem
        labelText="Street Name and Number..."
        id="street"
        onChange={props.onChange}
      />
      <AddressItem
        labelText="Country..."
        id="country"
        onChange={props.onChange}
      />
      <AddressItem
        labelText="Province..."
        id="province"
        onChange={props.onChange}
      />
    </div>
  )
}

export default AddressInput;
