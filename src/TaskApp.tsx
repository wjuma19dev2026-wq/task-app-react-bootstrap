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
            <div className="card-body p-4">
              <div className="d-flex">
                <input
                  placeholder="Añade una nueva tarea"
                  type="text"
                  className="form-control"
                />
                <div className="btn btn-dark ml-2">+</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Progreso</h3>
              <div className="d-flex justify-content-between mt-3">
                <p className="m-0">0 de 3 completadas</p>
                <p className="m-0 fw-bold">0%</p>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-dark"
                  role="progressbar"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="card" id="tarea-card">
            <div className="card-header">
              <h3 className="card-title">Tarea</h3>
            </div>
            <div className="card-body">
              {/* Todos */}
              <section id="todos">
                <div className="card">
                  <div className="card-body">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id=""
                        value="option1"
                      />
                      <label className="form-check-label fw-bold">first</label>
                      <i className="bi bi-trash float-end"></i>
                    </div>
                  </div>
                </div>
              </section>

              {/* No hay tarea */}
              <div id="no-hay-tarea">
                <div className="icon">
                  <i className="bi bi-check-circle-fill"></i>
                </div>
                <h5 className="m-0">No hay tarea</h5>
                <p className="m-0">Agrega una tarea rriba para empezar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
