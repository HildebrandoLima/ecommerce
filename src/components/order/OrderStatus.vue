<template>
<div class="card mt-5">
    <div class="card-body">
        <div class="row">
            <div class="col-xl-3 col-md-6">
                <b class="text-muted">
                    <span>CONFIRMADO</span>
                </b>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <b class="text-muted">
                    <span>SEPARADO</span>
                </b>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <b class="text-muted">
                    <span>EM TRÂNSITO</span>
                </b>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>

            <div class="col-xl-3 col-md-6">
                <b class="text-muted">
                    <span>ENTREGUE</span>
                </b>
                <div class="progress">
                    <div class="progress-bar progress-bar-striped bg-primary" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>