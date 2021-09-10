import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import {
  TextField,
  FormControl,
  Button,
  Grid,
  FormLabel,
  Card,
  Divider,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
} from "../../ui/misc";

import { firebaseTeams } from "../../../firebase";

const defaultValues = {
  name: "",
  stadium: "",
  played: "",
  win: "",
  draw: "",
  lose: "",
  gf: "",
  ga: "",
};

const AddEditTeams = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
      played: Yup.string().required("This input is required"),
      win: Yup.string().required("This input is required"),
      lose: Yup.string().required("This input is required"),
      draw: Yup.string().required("This input is required"),
      ga: Yup.string().required("This input is required"),
      gf: Yup.string().required("This input is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const point = ({ draw = 0, win = 0 }) => {
    const totalPoint = win * 3 + draw * 1;
    return totalPoint;
  };

  const goalDifference = ({ gf = 0, ga = 0 }) => {
    const gd = gf > ga ? gf - ga : -(ga - gf);
    return gd;
  };

  const submitForm = (values) => {
    let dataToSubmit = {
      ...values,
      gd: goalDifference(values),
      point: point(values),
    };

    setLoading(true);

    if (formType === "add") {
      firebaseTeams
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Team added");
          formik.resetForm();
          props.history.push("/admin_teams");
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      firebaseTeams
        .doc(props.match.params.teamid)
        .update(dataToSubmit)
        .then(() => {
          showSuccessToast("Team updated");
          props.history.push("/admin_teams");
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const param = props.match.params.teamid;
    if (param) {
      firebaseTeams
        .doc(param)
        .get()
        .then((snapshot) => {
          if (snapshot.data()) {
            setFormType("edit");
            setValues(snapshot.data());
          } else {
            showErrorToast("Sorry, nothing was found");
          }
        })
        .catch((error) => {
          showErrorToast(error);
        });
    } else {
      setFormType("add");
      setValues(defaultValues);
    }
  }, [props.match.params.teamid]);

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Team Info</div>
            <Divider className="my-4" />
            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="p-3">
                    <div className="mb-5">
                      <FormControl className="half">
                        <FormLabel component="legend">Team</FormLabel>
                        <TextField
                          id="name"
                          name="name"
                          variant="outlined"
                          placeholder="Add Team Name"
                          {...formik.getFieldProps("name")}
                          {...textErrorHelper(formik, "name")}
                        />
                      </FormControl>
                      <FormControl className="half lm-1">
                        <FormLabel component="legend">Stadium</FormLabel>
                        <TextField
                          id="stadium"
                          name="stadium"
                          variant="outlined"
                          placeholder="Add Stadium Name"
                          {...formik.getFieldProps("stadium")}
                          {...textErrorHelper(formik, "stadium")}
                        />
                      </FormControl>
                    </div>
                    <div className="mb-5">
                      <FormControl className="half">
                        <FormLabel component="legend">Match Played</FormLabel>
                        <TextField
                          type="number"
                          id="played"
                          name="played"
                          variant="outlined"
                          placeholder="Add Played No"
                          {...formik.getFieldProps("played")}
                          {...textErrorHelper(formik, "played")}
                        />
                      </FormControl>
                      <FormControl className="half lm-1">
                        <FormLabel component="legend">Win</FormLabel>
                        <TextField
                          type="number"
                          id="win"
                          name="win"
                          variant="outlined"
                          placeholder="Add Win No"
                          {...formik.getFieldProps("win")}
                          {...textErrorHelper(formik, "win")}
                        />
                      </FormControl>
                    </div>

                    <div className="mb-5">
                      <FormControl className="half">
                        <FormLabel component="legend">Draw</FormLabel>
                        <TextField
                          type="number"
                          id="draw"
                          name="draw"
                          variant="outlined"
                          placeholder="Add Draw No"
                          {...formik.getFieldProps("draw")}
                          {...textErrorHelper(formik, "draw")}
                        />
                      </FormControl>
                      <FormControl className="half lm-1">
                        <FormLabel component="legend">Lose</FormLabel>
                        <TextField
                          type="number"
                          id="lose"
                          name="lose"
                          variant="outlined"
                          placeholder="Add Lose No"
                          {...formik.getFieldProps("lose")}
                          {...textErrorHelper(formik, "lose")}
                        />
                      </FormControl>
                    </div>

                    <div className="mb-5">
                      <FormControl className="half">
                        <FormLabel component="legend">Goals For</FormLabel>
                        <TextField
                          type="number"
                          id="gf"
                          name="gf"
                          variant="outlined"
                          placeholder="Add GF No"
                          {...formik.getFieldProps("gf")}
                          {...textErrorHelper(formik, "gf")}
                        />
                      </FormControl>
                      <FormControl className="half lm-1">
                        <FormLabel component="legend">Goals Against</FormLabel>
                        <TextField
                          type="number"
                          id="ga"
                          name="ga"
                          variant="outlined"
                          placeholder="Add GA No"
                          {...formik.getFieldProps("ga")}
                          {...textErrorHelper(formik, "ga")}
                        />
                      </FormControl>
                    </div>

                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      {formType === "add" ? "Add Team" : "Edit Team"}
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

export default AddEditTeams;
