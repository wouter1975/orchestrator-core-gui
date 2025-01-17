import createContext from "lib/uniforms-surfnet/__tests__/_createContext";
import mount from "lib/uniforms-surfnet/__tests__/_mount";
import { BoolField } from "lib/uniforms-surfnet/src";
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

test("<BoolField> - renders an input", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
});

test("<BoolField> - renders a input with correct id (inherited)", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("id")).toBeTruthy();
});

test("<BoolField> - renders a input with correct id (specified)", () => {
    const element = <BoolField name="x" id="y" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("id")).toBe("y");
});

test("<BoolField> - renders a input with correct name", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("name")).toBe("x");
});

test("<BoolField> - renders an input with correct type", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("type")).toBe("checkbox");
});

test("<BoolField> - renders an input with correct disabled state", () => {
    const element = <BoolField name="x" disabled />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("disabled")).toBe(true);
});

test("<BoolField> - renders an input with correct readOnly state", () => {
    const onChange = jest.fn();

    const element = <BoolField name="x" readOnly />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }, { onChange }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").simulate("change")).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
});

test("<BoolField> - renders a input with correct label (specified)", () => {
    const element = <BoolField name="x" label="BoolFieldLabel" description="BoolFieldDescription" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("label")).toHaveLength(2);
    expect(wrapper.find("label").last().text()).toBe("x");
    expect(wrapper.find("label").last().prop("htmlFor")).toBe(wrapper.find("input").prop("id"));
});

test("<BoolField> - renders a input with correct value (default)", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("checked")).toBe(false);
});

test("<BoolField> - renders a input with correct value (model)", () => {
    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }, { model: { x: true } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("checked")).toBe(true);
});

test("<BoolField> - renders a input with correct value (specified)", () => {
    const element = <BoolField name="x" value />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").prop("checked")).toBe(true);
});

test("<BoolField> - renders a input which correctly reacts on change", () => {
    const onChange = jest.fn();

    const element = <BoolField name="x" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }, { onChange }));

    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("input").simulate("change", { target: { checked: true } })).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith("x", true);
});

test("<BoolField> - renders a wrapper with unknown props", () => {
    const element = <BoolField name="x" data-x="x" data-y="y" data-z="z" />;
    const wrapper = mount(element, createContext({ x: { type: Boolean } }));

    expect(wrapper.find("section").at(0).prop("data-x")).toBe("x");
    expect(wrapper.find("section").at(0).prop("data-y")).toBe("y");
    expect(wrapper.find("section").at(0).prop("data-z")).toBe("z");
});
