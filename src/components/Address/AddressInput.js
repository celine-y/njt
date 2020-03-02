import React, { useState } from "react";

import AddressItem from 'components/Address/AddressItem';

function AddressInput(props) {

  return(
    <div>
      <AddressItem
        labelText="Street Name and Number..."
        id="street"
        inputProps={{
          disabled: true,
          value:props.fields.street
        }}
      />
      <AddressItem
        labelText="Country..."
        id="country"
        inputProps={{
          disabled: true,
          value:props.fields.country
        }}
      />
      <AddressItem
        labelText="Province..."
        id="province"
        inputProps={{
          disabled: true,
          value:props.fields.province
        }}
      />
    </div>
  )
}

export default AddressInput;
