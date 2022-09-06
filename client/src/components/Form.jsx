import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import myStyles from "./styles.module.css";

export default (props) => {
    const { petName, petType, petDesc, skill1, skill2, skill3, onChangeHandler, onSubmitHandler } = props;

    return (
        <div className={myStyles.sub}>
            <form onSubmit={onSubmitHandler}>
                <div className="row">
                    <div className="col">
                        <p>
                            <label>Name:</label><br />
                            <input type="text" onChange={onChangeHandler} name="petName" value={petName} />
                        </p>
                        <p>
                            <label>Type:</label><br />
                            <input type="text" onChange={onChangeHandler} name="petType" value={petType} />
                        </p>
                        <p>
                            <label>Description:</label><br />
                            <input type="text" onChange={onChangeHandler} name="petDesc" value={petDesc} />
                        </p>
                        <button type="submit" className="btn btn-primary m-4">Submit</button>
                    </div>
                    <div className="col">
                        <p>Skills (optional)</p>
                        <p>
                            <label>Skill 1:</label><br />
                            <input type="text" onChange={onChangeHandler} name="skill1" value={skill1} />
                        </p>
                        <p>
                            <label>Skill 2:</label><br />
                            <input type="text" onChange={onChangeHandler} name="skill2" value={skill2} />
                        </p>
                        <p>
                            <label>Skill 3:</label><br />
                            <input type="text" onChange={onChangeHandler} name="skill3" value={skill3} />
                        </p>
                    </div>
                </div>
            </form>
        </div>
    )
}

