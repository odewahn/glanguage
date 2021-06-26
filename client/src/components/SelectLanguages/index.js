import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setStudentField } from "../../app/state/student";
import { setTutorField } from "../../app/state/tutor";

import SelectVoice from "../SelectVoice";

const Main = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);

  return (
    <div>
      <h3>Languages</h3>
      <SelectVoice
        label="My tutor speaks..."
        value={store.Tutor.language}
        setVoice={(v) => {
          dispatch(setTutorField("language", v));
        }}
      />

      <SelectVoice
        label="I speak..."
        value={store.Student.language}
        setVoice={(v) => {
          dispatch(setStudentField("language", v));
        }}
      />
    </div>
  );
};

export default Main;
