import "./TaskApp.css";

export const TaskApp = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex flex-column align-items-center">
          <h1 className="m-0">Lista de tareas</h1>
          <p>Manten tus tareas organizadas y consigue hacerla</p>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-body bg-light p-4">
              <div className="input-group">
                <input type="text" className="form-control" />
                <div className="btn btn-primary">Agregar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
