<template>
  <div class="bg-primary mb-4">
    <div class="container py-4">
      <h3 class="text-white mt-2">Cadastrar Conta</h3>

      <nav class="d-flex mb-2">
        <h6 class="mb-0">
          <RouterLink to="/" class="text-white-50">Home</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/about" class="text-white-50">Sobre</RouterLink>
            <span class="text-white-50 mx-2">&gt;</span>
          <RouterLink to="/account" class="text-white"><u>Cadastrar Conta</u></RouterLink>
        </h6>
      </nav>
    </div>
  </div>

  <div class="container">
    <div class="card mt-3">
      <div class="card-body">
        <div class="m-4">
          <div class="card text-center">
            <div class="card-header">
              <ul class="nav nav-tabs card-header-tabs" id="myTab">
                <li class="nav-item">
                  <a href="#profile" class="nav-link active" data-bs-toggle="tab">Perfil</a>
                </li>
                <li class="nav-item">
                  <a href="#address" class="nav-link" data-bs-toggle="tab">Endereço</a>
                </li>
                <li class="nav-item">
                  <a href="#telephone" class="nav-link" data-bs-toggle="tab">Telefone</a>
                </li>
              </ul>
            </div>

            <div class="card-body">
              <div class="tab-content">
                <div class="tab-pane fade show active" id="profile">
                  <h5 class="card-title">Perfil</h5><hr />
                 
                  <form>
                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="name" name="nome" class="form-control" placeholder="Nome" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <input type="email" id="email" name="email" class="form-control" placeholder="E-mail" required />
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="cpf" name="cpf" class="form-control" placeholder="CPF" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <input type="password" id="password" name="senha" class="form-control" placeholder="Senha" required />
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <label class="form-label" for="form6Example2">Data de Nascimento</label>
                          <input type="date" id="date" name="dataNascimento" class="form-control" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">                    
                          <div class="form-check">
                            <input type="radio" id="masculino" name="genero" class="form-check-input" checked />
                            <label class="form-check-label" for="flexRadioDefault1">Masculino</label>
                          </div>
                          <div class="form-check">
                            <input type="radio" id="feminino" name="genero" class="form-check-input" />
                            <label class="form-check-label" for="flexRadioDefault2">Feminino</label>
                          </div>
                          <div class="form-check">
                            <input type="radio" id="outro" name="genero" class="form-check-input" />
                            <label class="form-check-label" for="flexRadioDefault2">Outro</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4">Enviar</button>
                  </form>
                </div>

                <div class="tab-pane fade" id="address">
                  <h5 class="card-title">Endereço</h5><hr />

                  <form>
                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="cep" id="cep" name="cep" class="form-control" placeholder="CEP" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="logradouro" name="logradouro" class="form-control" placeholder="Logradouro" required />
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="descricao" name="descricao" class="form-control" placeholder="Descricao" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="bairro" name="bairro" class="form-control" placeholder="Bairro" required />
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="cidade" name="cidade" class="form-control" placeholder="Cidade" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="uf" name="uf" class="form-control" placeholder="uf" required />
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4">Enviar</button>
                  </form>
                </div>

                <div class="tab-pane fade" id="telephone">
                  <h5 class="card-title">Telefone</h5><hr />

                  <form>
                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Escolha o DDD</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          <select class="form-select" aria-label="Default select example">
                            <option selected>Escolha o Tipo</option>
                            <option value="Celular">Celular</option>
                            <option value="Fixo">Fixo</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="row mb-4">
                      <div class="col">
                        <div class="form-outline">
                          <input type="text" id="numero" name="numero" class="form-control" placeholder="Numero" required />
                        </div>
                      </div>

                      <div class="col">
                        <div class="form-outline">
                          
                        </div>
                      </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block mb-4">Enviar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>