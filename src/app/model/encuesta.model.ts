export class Encuesta{
    constructor (
        public _id: String,
        public titulo: String,
        public descripcion: String,
        public opinion: {
            si: Number,
            no: Number,
            ninguna: Number,
            usuariosEncuestados: []
        },
        public listaComentarios:[{
            textoComentario: String,
            idUsuarioComentario: String
        }],
        public creadorEncuesta: String
    ){}
}