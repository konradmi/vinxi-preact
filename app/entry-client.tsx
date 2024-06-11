import { hydrate } from 'preact'
import Counter from "./Counter";

const root = document.getElementById('app')!
hydrate(<Counter />, root);
