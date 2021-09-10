import React, { useState, useEffect } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";
import { useParams } from "react-router-dom";
// import FormField from '../../ui/formFields';
// import { validate } from '../../ui/misc';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  Card,
  FormHelperText,
  Divider,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  showErrorToast,
  showSuccessToast,
  textErrorHelper,
  selectErrorHelper,
  selectIsError,
} from "../../ui/misc";
import Fileuploader from "../../ui/fileuploader";
import { firebaseTeams, firebase } from "../../../firebase";

const defaultValues = {
  name: "",
  stadium: "",
};

const AddEditTeams = (props) => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("");
  const [values, setValues] = useState(defaultValues);
  const [defaultImg, setDefaultImg] = useState("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: values,
    validationSchema: Yup.object({
      name: Yup.string().required("This input is required"),
      stadium: Yup.string().required("This input is required"),
    }),
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const submitForm = (values) => {
    let dataToSubmit = values;
    setLoading(true);

    if (formType === "add") {
      firebaseTeams
        .add(dataToSubmit)
        .then(() => {
          showSuccessToast("Team added");
          formik.resetForm();
          props.history.push("/admin_players");
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
        })
        .catch((error) => {
          showErrorToast(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  //   useEffect(() => {
  //     const param = props.match.params.teamid;
  //     if (param) {
  //         firebaseTeams
  //         .doc(param)
  //         .get()
  //         .then((snapshot) => {
  //           if (snapshot.data()) {
  //             ////
  //             firebase
  //               .storage()
  //               .ref("players")
  //               .child(snapshot.data().image)
  //               .getDownloadURL()
  //               .then((url) => {
  //                 updateImageName(snapshot.data().image);
  //                 setDefaultImg(url);
  //               });

  //             setFormType("edit");
  //             setValues(snapshot.data());
  //           } else {
  //             showErrorToast("Sorry, nothing was found");
  //           }
  //         })
  //         .catch((error) => {
  //           showErrorToast(error);
  //         });
  //     } else {
  //       setFormType("add");
  //       setValues(defaultValues);
  //     }
  //   }, [props.match.params.playerid]);

  //   const updateImageName = (filename) => {
  //     formik.setFieldValue("image", filename);
  //   };

  //   const resetImage = () => {
  //     formik.setFieldValue("image", "");
  //     setDefaultImg("");
  //   };

  return (
    <AdminLayout title={formType === "add" ? "Add player" : "Edit player"}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card className="p-4 mb-4">
            <div className="font-size-lg font-weight-bold">Player Info</div>
            <Divider className="my-4" />
            <Grid container spacing={4}>
              <Grid item xs={12} lg={12}>
                <form onSubmit={formik.handleSubmit}>
                  <div className="p-3">
                    <div className="mb-5">
                      <FormControl fullWidth>
                        <TextField
                          id="name"
                          name="name"
                          variant="outlined"
                          placeholder="Add Team Name"
                          {...formik.getFieldProps("name")}
                          {...textErrorHelper(formik, "name")}
                        />
                      </FormControl>
                    </div>

                    <div className="mb-5">
                      <FormControl fullWidth>
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
