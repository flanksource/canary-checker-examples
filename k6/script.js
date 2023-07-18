import { check } from "k6";
import * as http from "k6/http";
import { Rate } from "k6/metrics";
import { jUnit } from "./node_modules/k6-junit/index.js";

export const errors = new Rate("errors");

export const options = {
    iterations: 20,
    thresholds: {
        checks: ["rate<2"],
    }
};

let i = 1;

export default function() {
    const res = http.get(`http://jsonplaceholder.typicode.com/users/${i++}`);
    const result = check(res, {
        "is status 200": r => r.status === 201,
        "not empty": r => Object.keys(r.json()).length > 0
    });
    errors.add(result ? 0 : 1);
}

export function handleSummary(data) {
    return {
        "/tmp/junit.xml": jUnit(data)
    };
}
