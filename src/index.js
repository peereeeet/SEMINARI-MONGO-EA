"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var deporte_1 = require("./modules/deporte");
var atleta_1 = require("./modules/atleta");
mongoose_1.default.connect('mongodb://127.0.0.1:27017/ejercicio1')
    .then(function () {
    console.log('Conectado a MongoDB');
    main();
})
    .catch(function (err) { return console.error('No se pudo conectar a MongoDB', err); });
function crearDeporte(nombre, descripcion) {
    return __awaiter(this, void 0, void 0, function () {
        var deporte, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deporte = new deporte_1.default({ nombre: nombre, descripcion: descripcion });
                    return [4 /*yield*/, deporte.save()];
                case 1:
                    r = _a.sent();
                    console.log('Deporte creado:', r);
                    return [2 /*return*/];
            }
        });
    });
}
function crearAtleta(nombre, edad, altura) {
    return __awaiter(this, void 0, void 0, function () {
        var atleta, r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    atleta = new atleta_1.default({ nombre: nombre, edad: edad, altura: altura });
                    return [4 /*yield*/, atleta.save()];
                case 1:
                    r = _a.sent();
                    console.log('Atleta creado:', r);
                    return [2 /*return*/];
            }
        });
    });
}
function asignarDeportesAtleta(nombreAtleta, nombresDeportes) {
    return __awaiter(this, void 0, void 0, function () {
        var atleta, deportes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, atleta_1.default.findOne({ nombre: nombreAtleta }).populate('deportesPracticados')];
                case 1:
                    atleta = _a.sent();
                    if (!atleta) {
                        console.error('No existe');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, deporte_1.default.find({ nombre: { $in: nombresDeportes } })];
                case 2:
                    deportes = _a.sent();
                    if (deportes.length === 0) {
                        console.error('No existen estos deportes');
                        return [2 /*return*/];
                    }
                    deportes.forEach(function (asignatura) { return atleta.deportesPracticados.push(deporte._id); });
                    return [4 /*yield*/, atleta.save()];
                case 3:
                    _a.sent();
                    console.log("Deportes que han sido asignados a ".concat(nombreAtleta, ":"), atleta.deportesPracticados);
                    return [2 /*return*/];
            }
        });
    });
}
function asignarAtletasDeporte(nombreDeporte, nombresAtletas) {
    return __awaiter(this, void 0, void 0, function () {
        var deporte, atletas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deporte_1.default.findOne({ nombre: nombreDeporte }).populate('atletas')];
                case 1:
                    deporte = _a.sent();
                    if (!deporte) {
                        console.error('No existe');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, atleta_1.default.find({ nombre: { $in: nombresAtletas } })];
                case 2:
                    atletas = _a.sent();
                    if (atletas.length === 0) {
                        console.error('No existen estos profesores');
                        return [2 /*return*/];
                    }
                    atletas.forEach(function (atleta) { return deporte.atletas.push(atleta._id); });
                    return [4 /*yield*/, deporte.save()];
                case 3:
                    _a.sent();
                    console.log("Profesores que han sido asignados a ".concat(nombreDeporte, ":"), deporte.atletas);
                    return [2 /*return*/];
            }
        });
    });
}
function obtenerNumeroDeAtletasPorDeporte() {
    return __awaiter(this, void 0, void 0, function () {
        var r;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deporte_1.default.aggregate([
                        { $unwind: '$atletas' },
                        { $group: { _id: '$nombre', numeroDeAtletas: { $sum: 1 } } }
                    ])];
                case 1:
                    r = _a.sent();
                    console.log('El numero de atletas segun el deporte es:', r);
                    return [2 /*return*/];
            }
        });
    });
}
function listarAtletas() {
    return __awaiter(this, void 0, void 0, function () {
        var atletas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, atleta_1.default.find().populate('deportesPracticados')];
                case 1:
                    atletas = _a.sent();
                    console.log('Atletas:', atletas);
                    return [2 /*return*/];
            }
        });
    });
}
function listarDeportes() {
    return __awaiter(this, void 0, void 0, function () {
        var deportes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deporte_1.default.find().populate('atletas')];
                case 1:
                    deportes = _a.sent();
                    console.log('Deportes:', deportes);
                    return [2 /*return*/];
            }
        });
    });
}
function verAtleta(nombre) {
    return __awaiter(this, void 0, void 0, function () {
        var atleta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, atleta_1.default.findOne({ nombre: nombre })];
                case 1:
                    atleta = _a.sent();
                    console.log('Atleta:', atleta);
                    return [2 /*return*/];
            }
        });
    });
}
function verDeporte(nombre) {
    return __awaiter(this, void 0, void 0, function () {
        var deporte;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deporte_1.default.findOne({ nombre: nombre })];
                case 1:
                    deporte = _a.sent();
                    console.log('Deporte:', deporte);
                    return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Creamos atletas y deportes');
                    return [4 /*yield*/, crearAtleta('Pere', 21, '1.75')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, crearAtleta('Carles', 23, '1.77')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, crearAtleta('Andrea', 23, '1.65')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, crearDeporte('Baloncesto', 'Tirar balón a canasta y encestar')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, crearDeporte('Futbol', 'Chutar balón a portería para marcar gol')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, crearDeporte('Golf', 'Lanzar pelota pequeña con un palo y meterla en un hollo')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, crearDeporte('Tenis', 'Lanzar una pelota pequeña con una raqueta contra tu oponente')];
                case 7:
                    _a.sent();
                    console.log('Asignar deportes a los atletas');
                    return [4 /*yield*/, asignarDeportesAtleta('Pere', ['Baloncesto', 'Futbol'])];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, asignarDeportesAtleta('Carles', ['Tenis', 'Futbol', 'Golf'])];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, asignarDeportesAtleta('Andrea', ['Baloncesto', 'Tenis'])];
                case 10:
                    _a.sent();
                    console.log('Asignar atletas a los deportes');
                    return [4 /*yield*/, asignarAtletasDeporte('Baloncesto', ['Pere'])];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Baloncesto', ['Andrea'])];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Futbol', ['Pere'])];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Futbol', ['Carles'])];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Tenis', ['Andrea'])];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Tenis', ['Carles'])];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, asignarAtletasDeporte('Golf', ['Carles'])];
                case 17:
                    _a.sent();
                    console.log('Aggregation Pipeline');
                    return [4 /*yield*/, obtenerNumeroDeAtletasPorDeporte()];
                case 18:
                    _a.sent();
                    console.log('Ver lista de atletas y asignaturas');
                    return [4 /*yield*/, listarAtletas()];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, listarDeportes()];
                case 20:
                    _a.sent();
                    console.log('Ver atleta y deporte por el nombre');
                    return [4 /*yield*/, verAtleta('Juan')];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, verDeporte('Matematicas')];
                case 22:
                    _a.sent();
                    mongoose_1.default.connection.close();
                    return [2 /*return*/];
            }
        });
    });
}
