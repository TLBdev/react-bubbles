import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [checker, setChecker] = useState(0)
  useEffect(() => {
    axiosWithAuth().get('/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.log(err))
  }, [checker])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} checker={checker} setChecker={setChecker} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
