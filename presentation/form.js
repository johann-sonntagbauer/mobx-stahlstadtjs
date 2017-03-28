import React from 'react';
import {observer} from 'mobx-react';

export default observer(function Form() {
  return <div>
      <input type="text" value={gustl.firstName} onChange={(e) => gustl.firstName = e.target.value}/>
      <input type="text" value={gustl.lastName} onChange={(e) => gustl.lastName = e.target.value}/>
    </div>
});