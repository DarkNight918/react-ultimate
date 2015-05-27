// IMPORTS =========================================================================================
import UUID from "node-uuid";
import {filter, flatten, keys, values} from "ramda";
import Moment from "moment";
import {flattenObject, mergeDeep} from "shared/helpers/common";
import {joiValidate} from "shared/helpers/validation";
import validators from "shared/validators/monster";

// MODELS ==========================================================================================
export default function Monster(data={}) {
  // Default values
  data = mergeDeep({
    id: UUID.v4(),
  }, data);

  // Convert and validate
  let [model, errors] = joiValidate(data, validators.model);
  if (Object.keys(errors).length) {
    let errorObj = flattenObject(errors);
    let errorArr = filter(v => v, flatten(values(errors)));
    throw Error(`invalid Monster data, errors: ${errorArr.join(", ")}`);
  }

  return model;
}
