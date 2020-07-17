/*
 * Copyright 2019-2020 SURF.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React from "react";

import {
    AutoField,
    BoolField,
    DateField,
    ListField,
    NestField,
    NumField,
    RadioField,
    SelectField,
    TextField
} from "../src";
import createContext from "./_createContext";
import mount from "./_mount";

test("<AutoField> - works", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: String } }));

    expect(wrapper.find(AutoField)).toHaveLength(1);
});

test("<AutoField> - detects RadioField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(
        element,
        createContext({
            x: {
                type: String,
                allowedValues: ["x", "y"],
                uniforms: { checkboxes: true }
            }
        })
    );

    expect(wrapper.find(RadioField.Component)).toHaveLength(1);
});

test("<AutoField> - detects SelectField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(
        element,
        createContext({
            x: { type: Array, allowedValues: ["x", "y"] },
            "x.$": { type: String }
        })
    );

    expect(wrapper.find(SelectField.Component)).toHaveLength(1);
});

test("<AutoField> - detects DateField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Date } }));

    expect(wrapper.find(DateField.Component)).toHaveLength(1);
});

test("<AutoField> - detects ListField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Array }, "x.$": { type: String } }));

    expect(wrapper.find(ListField)).toHaveLength(1);
});

test("<AutoField> - detects NumField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Number } }));

    expect(wrapper.find(NumField.Component)).toHaveLength(1);
});

test("<AutoField> - detects NestField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Object } }));

    expect(wrapper.find(NestField)).toHaveLength(1);
});

test("<AutoField> - detects TextField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: String } }));

    expect(wrapper.find(TextField.Component)).toHaveLength(1);
});

test("<AutoField> - detects BoolField", () => {
    const element = <AutoField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find(BoolField.Component)).toHaveLength(1);
});

test("<AutoField> - uses Component (schema)", () => {
    const Component = jest.fn(() => null);

    const element = <AutoField name="x" />;
    mount(element, createContext({ x: { type: String, uniforms: { component: Component } } }));

    expect(Component).toHaveBeenCalledTimes(1);
});

test("<AutoField> - uses Component (props)", () => {
    const Component = jest.fn(() => null);

    const element = <AutoField name="x" component={Component} />;
    mount(element, createContext({ x: { type: String } }));

    expect(Component).toHaveBeenCalledTimes(1);
});