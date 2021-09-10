import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useFormik } from "formik";
import * as Yup from "yup";
// import FormField from "../../ui/formFields";
// import { validate } from "../../ui/misc";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Grid,
  Card,
  Divider,
} from "@material-ui/core";
import { firebaseTeams, firebaseMatches } from "../../../firebase";
//import { firebaseLooper } from '../../ui/misc';
import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from "../../ui/misc";

const defaultValues = {
  date: "",
  local: "",
  resultLocal: "",
  away: "",
  resultAway: "",
  referee: "",
  stadium: "",
  result: "",
  final: "",
};

const AddEditMatch = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [teams, setTeams] = useState(null);
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      date: Yup.string().required("This input is required"),
      local: Yup.string().required("This input is required"),
      resultLocal: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(99, "The maximum is 30"),
      away: Yup.string().required("This input is required"),
      resultAway: Yup.number()
        .required("This input is required")
        .min(0, "The minimum is 0")
        .max(99, "The maximum is 30"),
      referee: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
      result: Yup.mixed()
        .required("This input is required")
        .oneOf(["W", "D", "L", "n/a"]),
      final: Yup.mixed()
        .required("This input is required")
        .oneOf(["yes", "no"]),
    }),
    onSubmit: (values) => {
      // submit form
      submitForm(values);
    },
  });

  const showTeams = () =>
    teams
      ? teams.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))
      : null;

  const showStadium = () =>
    teams
      ? teams.map((item) => (
          <MenuItem key={item.id} value={item.stadium}>
            {item.stadium}
          </MenuItem>
        ))
      : null;

  const submitForm = (values) => {
    let dataToSubmit = values;

    teams.forEach((team) => {
      if (team.shortName === dataToSubmit.local) {
        dataToSubmit["localThmb"] = team.thmb;
      }
      if (team.shortName === dataToSubmit.away) {
        dataToSubmit["awayThmb"] = team.thmb;
      }
    });

    setLoading(true);
    if (formType === "add") {
      firebaseMatches
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Match added :)");
          formik.resetForm();
        })
        .catch((error) => {
          showErrorToast("Sorry, something went wrong", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      firebaseMatches
        .doc(props.match.params.matchid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast("Match Updated");
        })
        .catch((error) => {
          showErrorToast("Sorry, something went wrong", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!teams) {
      firebaseTeams
        .get()
        .then((snapshot) => {
          const teams = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log({ teams });
          setTeams(teams);
        })
        .catch((error) => {
          showErrorToast(error);
        });
    }
  }, [teams]);

  useEffect(() => {
    const param = props.match.params.matchid;
    if (param) {
      /// edit
      firebaseMatches
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType("edit");
            setValues(snapshot.data());
          } else {
            showErrorToast("No records found");
          }
        });
    } else {
      // add
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.matchid]);

  return (
    <AdminLayout title={formType === "add" ? "Add match" : "Edit match"}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Team Info</div>
            <Divider className="my-4" />
            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="p-3">
                    <div className="mb-5">
                      <h6 className="mb-3">Select date</h6>
                      <FormControl fullWidth>
                        <TextField
                          id="date"
                          name="date"
                          type="date"
                          variant="outlined"
                          {...formik.getFieldProps("date")}
                          {...textErrorHelper(formik, "date")}
                        />
                      </FormControl>
                    </div>
                    <div className="mb-5">
                      <h6 className="mb-3">Result Home</h6>
                      <FormControl
                        error={selectIsError(formik, "local")}
                        style={{ width: "49%" }}
                      >
                        <Select
                          id="local"
                          name="local"
                          variant="outlined"
                          displayEmpty
                          {...formik.getFieldProps("local")}
                        >
                          <MenuItem value="" disabled>
                            Select a team
                          </MenuItem>
                          {showTeams()}
                        </Select>
                        {selectErrorHelper(formik, "local")}
                      </FormControl>

                      <FormControl style={{ marginLeft: "10px", width: "49%" }}>
                        <TextField
                          id="resultLocal"
                          name="resultLocal"
                          type="number"
                          variant="outlined"
                          placeholder="goals"
                          {...formik.getFieldProps("resultLocal")}
                          {...textErrorHelper(formik, "resultLocal")}
                        />
                      </FormControl>
                    </div>
                    <div className="mb-5">
                      <h6 className="mb-3">Result away</h6>
                      <FormControl
                        error={selectIsError(formik, "away")}
                        style={{ width: "49%" }}
                      >
                        <Select
                          id="away"
                          name="away"
                          variant="outlined"
                          displayEmpty
                          {...formik.getFieldProps("away")}
                        >
                          <MenuItem value="" disabled>
                            Select a team
                          </MenuItem>
                          {showTeams()}
                        </Select>
                        {selectErrorHelper(formik, "away")}
                      </FormControl>

                      <FormControl style={{ marginLeft: "10px", width: "49%" }}>
                        <TextField
                          id="resultAway"
                          name="resultAway"
                          type="number"
                          variant="outlined"
                          placeholder="goals"
                          {...formik.getFieldProps("resultAway")}
                          {...textErrorHelper(formik, "resultAway")}
                        />
                      </FormControl>
                    </div>
                    <div className="mb-5">
                      <h6 className="mb-3">Match info</h6>
                      <div className="mb-5">
                        <FormControl fullWidth>
                          <TextField
                            id="referee"
                            name="referee"
                            variant="outlined"
                            placeholder="Add the referee name"
                            {...formik.getFieldProps("referee")}
                            {...textErrorHelper(formik, "referee")}
                          />
                        </FormControl>
                      </div>

                      <div className="mb-5">
                        <FormControl
                          error={selectIsError(formik, "stadium")}
                          fullWidth
                        >
                          <Select
                            id="stadium"
                            name="stadium"
                            variant="outlined"
                            displayEmpty
                            {...formik.getFieldProps("stadium")}
                          >
                            <MenuItem value="" disabled>
                              Select a stadium
                            </MenuItem>
                            {showStadium()}
                          </Select>
                          {selectErrorHelper(formik, "stadium")}
                        </FormControl>
                      </div>

                      <div className="mb-5">
                        <FormControl
                          error={selectIsError(formik, "result")}
                          fullWidth
                        >
                          <Select
                            id="result"
                            name="result"
                            variant="outlined"
                            displayEmpty
                            {...formik.getFieldProps("result")}
                          >
                            <MenuItem value="" disabled>
                              Select a result
                            </MenuItem>
                            <MenuItem value="W">Win</MenuItem>
                            <MenuItem value="D">Draw</MenuItem>
                            <MenuItem value="L">Lose</MenuItem>
                            <MenuItem value="n/a">Non available</MenuItem>
                          </Select>
                          {selectErrorHelper(formik, "result")}
                        </FormControl>
                      </div>

                      <div className="mb-5">
                        <FormControl
                          error={selectIsError(formik, "final")}
                          fullWidth
                        >
                          <Select
                            id="final"
                            name="final"
                            variant="outlined"
                            displayEmpty
                            {...formik.getFieldProps("final")}
                          >
                            <MenuItem value="" disabled>
                              Was the game played ?
                            </MenuItem>
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                          </Select>
                          {selectErrorHelper(formik, "final")}
                        </FormControl>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {formType === "add" ? "Add match" : "Edit match"}
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default AddEditMatch;
