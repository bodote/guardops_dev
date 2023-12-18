export const dummyData = [{
    "_id": {
        "$oid": "65608c080e4be8797abd73f4"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x2d322850ddab5fad65f438073c6f526d",
        "span_id": "0x6ef288192796fbf3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xcc9fe34822f94635",
    "start_time": "2023-11-24T11:41:59.571491Z",
    "end_time": "2023-11-24T11:42:00.560303Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Antworte mit der Zahl 2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2",
        "llm_usage_total_tokens": 16,
        "llm_usage_completion_tokens": 1,
        "llm_usage_prompt_tokens": 15
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "65608c080e4be8797abd73f5"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x2d322850ddab5fad65f438073c6f526d",
        "span_id": "0xcc9fe34822f94635",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-24T11:41:59.421395Z",
    "end_time": "2023-11-24T11:42:00.561310Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Antworte mit der Zahl 2&model=openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 55754,
        "http_route": "/api/completion_request/",
        "prompt": "Antworte mit der Zahl 2",
        "access_token": "af02b41dc34422e928363f1c9218d64dd3223a4a1ec5e98ce54b0ddcc5457406",
        "id": "chatcmpl-8OOrIN72XnhVcLt4dGWCOYqgAUlyo",
        "object": "chat.completion",
        "created": 1700826120,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2",
        "finish_reason": "stop",
        "prompt_tokens": 15,
        "completion_tokens": 1,
        "total_tokens": 16
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "65608c080e4be8797abd73f6"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x2d322850ddab5fad65f438073c6f526d",
        "span_id": "0xafb78d9687c1e4e4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xcc9fe34822f94635",
    "start_time": "2023-11-24T11:42:00.563216Z",
    "end_time": "2023-11-24T11:42:00.564242Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "65608c080e4be8797abd73f7"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x2d322850ddab5fad65f438073c6f526d",
        "span_id": "0x05e12999f804f009",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xcc9fe34822f94635",
    "start_time": "2023-11-24T11:42:00.564514Z",
    "end_time": "2023-11-24T11:42:00.564848Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a6dd0f4e2784e3f26c00"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x6981d27bbc714c8e9eb307f665b3ec28",
        "span_id": "0x9cb65ccaea06fffa",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x9141788c674ab179",
    "start_time": "2023-11-27T14:25:32.873460Z",
    "end_time": "2023-11-27T14:25:33.780150Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 2+2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2+2 ist 4.",
        "llm_usage_total_tokens": 20,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a6dd0f4e2784e3f26c01"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x6981d27bbc714c8e9eb307f665b3ec28",
        "span_id": "0x9141788c674ab179",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:25:32.836455Z",
    "end_time": "2023-11-27T14:25:33.781679Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 2+2&model=openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63124,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 2+2",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-8PWqDMsAZhZFjLbhFXYInKOhpWWPB",
        "object": "chat.completion",
        "created": 1701095133,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2+2 ist 4.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a6dd0f4e2784e3f26c02"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x6981d27bbc714c8e9eb307f665b3ec28",
        "span_id": "0xab7eb381d8c4b671",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9141788c674ab179",
    "start_time": "2023-11-27T14:25:33.782914Z",
    "end_time": "2023-11-27T14:25:33.784380Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a6dd0f4e2784e3f26c03"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x6981d27bbc714c8e9eb307f665b3ec28",
        "span_id": "0xad2ac33f897618a3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9141788c674ab179",
    "start_time": "2023-11-27T14:25:33.784626Z",
    "end_time": "2023-11-27T14:25:33.784751Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a7f86203c792c745bac1"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xe6628a4e34c6af0c852cc0a271f40b7f",
        "span_id": "0xfca840d2370ec55d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x0892231489579412",
    "start_time": "2023-11-27T14:30:16.104466Z",
    "end_time": "2023-11-27T14:30:16.986146Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 2+3",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2+3 ist gleich 5.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a7f96203c792c745bac2"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xe6628a4e34c6af0c852cc0a271f40b7f",
        "span_id": "0x0892231489579412",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:30:15.920959Z",
    "end_time": "2023-11-27T14:30:16.987634Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 2+3&model=openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63150,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 2+3",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-8PWumuxQUTmqVCac7TS2DNePOYLTY",
        "object": "chat.completion",
        "created": 1701095416,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2+3 ist gleich 5.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a7f96203c792c745bac3"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xe6628a4e34c6af0c852cc0a271f40b7f",
        "span_id": "0x4a454a83e4bd9ba9",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x0892231489579412",
    "start_time": "2023-11-27T14:30:16.988975Z",
    "end_time": "2023-11-27T14:30:16.990748Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564a7f96203c792c745bac4"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xe6628a4e34c6af0c852cc0a271f40b7f",
        "span_id": "0x262d7c6d7a3cd3bd",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x0892231489579412",
    "start_time": "2023-11-27T14:30:16.991070Z",
    "end_time": "2023-11-27T14:30:16.991230Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa0510d5e22f0cdc79ac"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x3ecf0fb161f4d49e8bc65834a526d0ae",
        "span_id": "0x43e81f397f9a8b5f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x630aaa0bdc8c1a48",
    "start_time": "2023-11-27T14:39:00.526781Z",
    "end_time": "2023-11-27T14:39:01.493603Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 2+4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2+4 ist gleich 6.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa0510d5e22f0cdc79ad"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x3ecf0fb161f4d49e8bc65834a526d0ae",
        "span_id": "0x630aaa0bdc8c1a48",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:39:00.356092Z",
    "end_time": "2023-11-27T14:39:01.494251Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 2+4&model=openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63211,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 2+4",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-8PX3FLwrLQyiNvi1IacRXqLv5YYT1",
        "object": "chat.completion",
        "created": 1701095941,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2+4 ist gleich 6.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PX3FLwrLQyiNvi1IacRXqLv5YYT1', 'object': 'chat.completion', 'created': 1701095941, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2+4 ist gleich 6.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa0510d5e22f0cdc79ae"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x3ecf0fb161f4d49e8bc65834a526d0ae",
        "span_id": "0x59adc3a51f46b1cb",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x630aaa0bdc8c1a48",
    "start_time": "2023-11-27T14:39:01.495333Z",
    "end_time": "2023-11-27T14:39:01.496494Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa0510d5e22f0cdc79af"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x3ecf0fb161f4d49e8bc65834a526d0ae",
        "span_id": "0x5437a0a999c1d168",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x630aaa0bdc8c1a48",
    "start_time": "2023-11-27T14:39:01.496923Z",
    "end_time": "2023-11-27T14:39:01.497227Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa4810d5e22f0cdc79b1"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x17dcaae9fa1245f72fd0d96c2fb53208",
        "span_id": "0xd9e1213fe99862c7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xf8ac69b0b3f7678f",
    "start_time": "2023-11-27T14:40:07.421546Z",
    "end_time": "2023-11-27T14:40:08.628489Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 2+4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2 + 4 = 6",
        "llm_usage_total_tokens": 20,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa4810d5e22f0cdc79b2"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x17dcaae9fa1245f72fd0d96c2fb53208",
        "span_id": "0xf8ac69b0b3f7678f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:40:07.388898Z",
    "end_time": "2023-11-27T14:40:08.629625Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 2+4&model=openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63221,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 2+4",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-8PX4KSCWa8DutU7v03x3mvorcvR4u",
        "object": "chat.completion",
        "created": 1701096008,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2 + 4 = 6",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20,
        "response": "{'id': 'chatcmpl-8PX4KSCWa8DutU7v03x3mvorcvR4u', 'object': 'chat.completion', 'created': 1701096008, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2 + 4 = 6'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 7, 'total_tokens': 20}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa4810d5e22f0cdc79b3"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x17dcaae9fa1245f72fd0d96c2fb53208",
        "span_id": "0x3bd60bfafdd3c60b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xf8ac69b0b3f7678f",
    "start_time": "2023-11-27T14:40:08.631045Z",
    "end_time": "2023-11-27T14:40:08.631949Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564aa4810d5e22f0cdc79b4"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x17dcaae9fa1245f72fd0d96c2fb53208",
        "span_id": "0x7a1f362f4b4e5fd5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xf8ac69b0b3f7678f",
    "start_time": "2023-11-27T14:40:08.632420Z",
    "end_time": "2023-11-27T14:40:08.632903Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ab7439a6d1d3a7160b7a"
    },
    "name": "POST",
    "context": {
        "trace_id": "0x643a57a493e9821664f7ff6268c17499",
        "span_id": "0x92924e4a34536c6a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xd3e8940ecc91a3c9",
    "start_time": "2023-11-27T14:42:57.722811Z",
    "end_time": "2023-11-27T14:45:08.184157Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_method": "POST",
        "http_url": "https://lm3.hs-ansbach.de/worker2/v1/chat/completions",
        "http_status_code": 200
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ab7439a6d1d3a7160b7b"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x643a57a493e9821664f7ff6268c17499",
        "span_id": "0xe5e5e725547231ab",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xd3e8940ecc91a3c9",
    "start_time": "2023-11-27T14:42:57.659680Z",
    "end_time": "2023-11-27T14:45:08.192248Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://lm3.hs-ansbach.de/worker2/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "dias-13b",
        "llm_request_max_tokens": 50,
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 2+4",
        "llm_response_model": "dias-13b",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2+4 ist 6.\n#",
        "llm_usage_total_tokens": 0,
        "llm_usage_completion_tokens": 0,
        "llm_usage_prompt_tokens": 0
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ab7439a6d1d3a7160b7c"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x643a57a493e9821664f7ff6268c17499",
        "span_id": "0xd3e8940ecc91a3c9",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:42:57.405277Z",
    "end_time": "2023-11-27T14:45:08.192826Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 2+4&model=lm3openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63258,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 2+4",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-mUqu7wonqjmjtALJoSr3Dt",
        "object": "chat.completion",
        "created": 1701096308,
        "model": "dias-13b",
        "index": 0,
        "role": "assistant",
        "content": "2+4 ist 6.\n#",
        "finish_reason": "stop",
        "prompt_tokens": 0,
        "total_tokens": 0,
        "completion_tokens": 0,
        "response": "{'id': 'chatcmpl-mUqu7wonqjmjtALJoSr3Dt', 'object': 'chat.completion', 'created': 1701096308, 'model': 'dias-13b', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2+4 ist 6.\\n#'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 0, 'total_tokens': 0, 'completion_tokens': 0}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ab7439a6d1d3a7160b7d"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x643a57a493e9821664f7ff6268c17499",
        "span_id": "0x03de33aa2818f7d0",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xd3e8940ecc91a3c9",
    "start_time": "2023-11-27T14:45:08.193853Z",
    "end_time": "2023-11-27T14:45:08.195070Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ab7439a6d1d3a7160b7e"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x643a57a493e9821664f7ff6268c17499",
        "span_id": "0x65cd2fe97b77489c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xd3e8940ecc91a3c9",
    "start_time": "2023-11-27T14:45:08.195327Z",
    "end_time": "2023-11-27T14:45:08.195869Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564abda2f0acb333d9aeaf9"
    },
    "name": "POST",
    "context": {
        "trace_id": "0x83fd9b4f24ec3736367fee26fe59a224",
        "span_id": "0xf75f74366e0bf5b1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xe515d339d3358597",
    "start_time": "2023-11-27T14:46:48.468537Z",
    "end_time": "2023-11-27T14:46:50.722049Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_method": "POST",
        "http_url": "https://lm3.hs-ansbach.de/worker2/v1/chat/completions",
        "http_status_code": 200
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564abda2f0acb333d9aeafa"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x83fd9b4f24ec3736367fee26fe59a224",
        "span_id": "0x76f21b04893cc41b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xe515d339d3358597",
    "start_time": "2023-11-27T14:46:48.395996Z",
    "end_time": "2023-11-27T14:46:50.730142Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://lm3.hs-ansbach.de/worker2/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "dias-13b",
        "llm_request_max_tokens": 50,
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Who are you?",
        "llm_response_model": "dias-13b",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "I am a chatbot called Alpaca. I was created by a team of developers and data scientists to help people with their questions and provide them with useful information. I am always here to help you, so feel free to ask me anything",
        "llm_usage_total_tokens": 0,
        "llm_usage_completion_tokens": 0,
        "llm_usage_prompt_tokens": 0
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564abda2f0acb333d9aeafb"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x83fd9b4f24ec3736367fee26fe59a224",
        "span_id": "0xe515d339d3358597",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:46:48.233985Z",
    "end_time": "2023-11-27T14:46:50.731238Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Who are you?&model=lm3openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63325,
        "http_route": "/api/completion_request/",
        "prompt": "Who are you?",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-3jaw5GQiwyq3NavLUFeqVL",
        "object": "chat.completion",
        "created": 1701096410,
        "model": "dias-13b",
        "index": 0,
        "role": "assistant",
        "content": "I am a chatbot called Alpaca. I was created by a team of developers and data scientists to help people with their questions and provide them with useful information. I am always here to help you, so feel free to ask me anything",
        "finish_reason": "stop",
        "prompt_tokens": 0,
        "total_tokens": 0,
        "completion_tokens": 0,
        "response": "{'id': 'chatcmpl-3jaw5GQiwyq3NavLUFeqVL', 'object': 'chat.completion', 'created': 1701096410, 'model': 'dias-13b', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'I am a chatbot called Alpaca. I was created by a team of developers and data scientists to help people with their questions and provide them with useful information. I am always here to help you, so feel free to ask me anything'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 0, 'total_tokens': 0, 'completion_tokens': 0}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564abda2f0acb333d9aeafc"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x83fd9b4f24ec3736367fee26fe59a224",
        "span_id": "0xf0fc7a781dc53758",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xe515d339d3358597",
    "start_time": "2023-11-27T14:46:50.732351Z",
    "end_time": "2023-11-27T14:46:50.733742Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564abda2f0acb333d9aeafd"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x83fd9b4f24ec3736367fee26fe59a224",
        "span_id": "0xc62795f9b7b8c88b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xe515d339d3358597",
    "start_time": "2023-11-27T14:46:50.734094Z",
    "end_time": "2023-11-27T14:46:50.735298Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ac632f0acb333d9aeaff"
    },
    "name": "POST",
    "context": {
        "trace_id": "0x3e99240d32cf8b8ee04cb7941a3fa6c8",
        "span_id": "0x22e2161d191e7dc1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x992bb4b0cb976745",
    "start_time": "2023-11-27T14:46:57.291254Z",
    "end_time": "2023-11-27T14:49:07.851516Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_method": "POST",
        "http_url": "https://lm3.hs-ansbach.de/worker2/v1/chat/completions",
        "http_status_code": 200
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ac632f0acb333d9aeb00"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x3e99240d32cf8b8ee04cb7941a3fa6c8",
        "span_id": "0x2aaf5205308c1d5c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x992bb4b0cb976745",
    "start_time": "2023-11-27T14:46:57.289172Z",
    "end_time": "2023-11-27T14:49:07.854084Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://lm3.hs-ansbach.de/worker2/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "dias-13b",
        "llm_request_max_tokens": 50,
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Was ist 6+6",
        "llm_response_model": "dias-13b",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "6+6 ist 12.\n#",
        "llm_usage_total_tokens": 0,
        "llm_usage_completion_tokens": 0,
        "llm_usage_prompt_tokens": 0
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ac632f0acb333d9aeb01"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x3e99240d32cf8b8ee04cb7941a3fa6c8",
        "span_id": "0x992bb4b0cb976745",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-27T14:46:57.255719Z",
    "end_time": "2023-11-27T14:49:07.854872Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Was ist 6+6&model=lm3openai",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 63328,
        "http_route": "/api/completion_request/",
        "prompt": "Was ist 6+6",
        "access_token": "ca874b36ad923065c6ffe5f0343b17a853ea18c86f6bdaa059db07ea60aebf0c",
        "id": "chatcmpl-3YP2o6KbGeyEoV2GMDYCws",
        "object": "chat.completion",
        "created": 1701096547,
        "model": "dias-13b",
        "index": 0,
        "role": "assistant",
        "content": "6+6 ist 12.\n#",
        "finish_reason": "stop",
        "prompt_tokens": 0,
        "total_tokens": 0,
        "completion_tokens": 0,
        "response": "{'id': 'chatcmpl-3YP2o6KbGeyEoV2GMDYCws', 'object': 'chat.completion', 'created': 1701096547, 'model': 'dias-13b', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '6+6 ist 12.\\n#'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 0, 'total_tokens': 0, 'completion_tokens': 0}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ac632f0acb333d9aeb02"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x3e99240d32cf8b8ee04cb7941a3fa6c8",
        "span_id": "0xb107b0618baf97ce",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x992bb4b0cb976745",
    "start_time": "2023-11-27T14:49:07.855922Z",
    "end_time": "2023-11-27T14:49:07.856777Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6564ac632f0acb333d9aeb03"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x3e99240d32cf8b8ee04cb7941a3fa6c8",
        "span_id": "0x0a5cebcc01f26f31",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x992bb4b0cb976745",
    "start_time": "2023-11-27T14:49:07.857162Z",
    "end_time": "2023-11-27T14:49:07.857289Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad85aada193ec80e08b1"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x7b585ff8e82bd447b0508dc1e90125e0",
        "span_id": "0xbf3dd716d813f0cf",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x239a5e807ccc44dd",
    "start_time": "2023-11-28T09:06:11.639163Z",
    "end_time": "2023-11-28T09:06:13.317917Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+1?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1+1 equals 2.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 14
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad85aada193ec80e08b2"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x7b585ff8e82bd447b0508dc1e90125e0",
        "span_id": "0x239a5e807ccc44dd",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:06:11.334437Z",
    "end_time": "2023-11-28T09:06:13.318881Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+1?&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49866,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+1?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoKikqign4J8kB86iXSyBbXTfQeb",
        "object": "chat.completion",
        "created": 1701162372,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1+1 equals 2.",
        "finish_reason": "stop",
        "prompt_tokens": 14,
        "completion_tokens": 7,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoKikqign4J8kB86iXSyBbXTfQeb', 'object': 'chat.completion', 'created': 1701162372, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1+1 equals 2.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 14, 'completion_tokens': 7, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad85aada193ec80e08b3"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x7b585ff8e82bd447b0508dc1e90125e0",
        "span_id": "0x9db3363c351bad94",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x239a5e807ccc44dd",
    "start_time": "2023-11-28T09:06:13.319990Z",
    "end_time": "2023-11-28T09:06:13.320959Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad85aada193ec80e08b4"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x7b585ff8e82bd447b0508dc1e90125e0",
        "span_id": "0x6f79a128419717f1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x239a5e807ccc44dd",
    "start_time": "2023-11-28T09:06:13.321180Z",
    "end_time": "2023-11-28T09:06:13.321320Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad93aada193ec80e08b6"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xaeb14a02bbd65e694559845439f2bae9",
        "span_id": "0x001d842fe51b6777",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x476a7892e5080d7e",
    "start_time": "2023-11-28T09:06:25.849894Z",
    "end_time": "2023-11-28T09:06:27.182348Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "How many letters does the word \"coai\" have?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The word \"coai\" has 4 letters.",
        "llm_usage_total_tokens": 30,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 19
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad93aada193ec80e08b7"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xaeb14a02bbd65e694559845439f2bae9",
        "span_id": "0x476a7892e5080d7e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:06:25.811370Z",
    "end_time": "2023-11-28T09:06:27.183010Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=How many letters does the word \"coai\" have?&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49869,
        "http_route": "/api/completion_request/",
        "prompt": "How many letters does the word \"coai\" have?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoKw9MPgb6s4QdT3ZTg3YDkeUPSC",
        "object": "chat.completion",
        "created": 1701162386,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The word \"coai\" has 4 letters.",
        "finish_reason": "stop",
        "prompt_tokens": 19,
        "completion_tokens": 11,
        "total_tokens": 30,
        "response": "{'id': 'chatcmpl-8PoKw9MPgb6s4QdT3ZTg3YDkeUPSC', 'object': 'chat.completion', 'created': 1701162386, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The word \"coai\" has 4 letters.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 19, 'completion_tokens': 11, 'total_tokens': 30}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad93aada193ec80e08b8"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xaeb14a02bbd65e694559845439f2bae9",
        "span_id": "0x6856a9e2746a93ed",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x476a7892e5080d7e",
    "start_time": "2023-11-28T09:06:27.183727Z",
    "end_time": "2023-11-28T09:06:27.184378Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ad93aada193ec80e08b9"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xaeb14a02bbd65e694559845439f2bae9",
        "span_id": "0x4f239e2b3bcdefa4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x476a7892e5080d7e",
    "start_time": "2023-11-28T09:06:27.184592Z",
    "end_time": "2023-11-28T09:06:27.184711Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adafaada193ec80e08bb"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xc5de1e8c6c221fd629ceb7ed4d71bda3",
        "span_id": "0x5c5baff047f9fffb",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x18e1eb8046ad0562",
    "start_time": "2023-11-28T09:06:53.863991Z",
    "end_time": "2023-11-28T09:06:55.873809Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "If my brother was half my age when i was 8 and i am now 29. How old is my brother now?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "If your brother was half your age when you were 8, that means he was 4 years old at that time. Since then, 21 years have passed (29 - 8 = 21). Therefore, your brother is now 4 + 21 = 25 years old.",
        "llm_usage_total_tokens": 92,
        "llm_usage_completion_tokens": 59,
        "llm_usage_prompt_tokens": 33
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adafaada193ec80e08bc"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xc5de1e8c6c221fd629ceb7ed4d71bda3",
        "span_id": "0x18e1eb8046ad0562",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:06:53.829103Z",
    "end_time": "2023-11-28T09:06:55.875678Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=If my brother was half my age when i was 8 and i am now 29. How old is my brother now?&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49870,
        "http_route": "/api/completion_request/",
        "prompt": "If my brother was half my age when i was 8 and i am now 29. How old is my brother now?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoLOFeckejQReFF4Ak2eLHJ1KGFN",
        "object": "chat.completion",
        "created": 1701162414,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "If your brother was half your age when you were 8, that means he was 4 years old at that time. Since then, 21 years have passed (29 - 8 = 21). Therefore, your brother is now 4 + 21 = 25 years old.",
        "finish_reason": "stop",
        "prompt_tokens": 33,
        "completion_tokens": 59,
        "total_tokens": 92,
        "response": "{'id': 'chatcmpl-8PoLOFeckejQReFF4Ak2eLHJ1KGFN', 'object': 'chat.completion', 'created': 1701162414, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'If your brother was half your age when you were 8, that means he was 4 years old at that time. Since then, 21 years have passed (29 - 8 = 21). Therefore, your brother is now 4 + 21 = 25 years old.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 33, 'completion_tokens': 59, 'total_tokens': 92}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adafaada193ec80e08bd"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xc5de1e8c6c221fd629ceb7ed4d71bda3",
        "span_id": "0x8f8c1795eaf55ebf",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x18e1eb8046ad0562",
    "start_time": "2023-11-28T09:06:55.877145Z",
    "end_time": "2023-11-28T09:06:55.877991Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adafaada193ec80e08be"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xc5de1e8c6c221fd629ceb7ed4d71bda3",
        "span_id": "0x3b41fffc4236bbbd",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x18e1eb8046ad0562",
    "start_time": "2023-11-28T09:06:55.878452Z",
    "end_time": "2023-11-28T09:06:55.878568Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adbcaada193ec80e08c0"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x537539c1688e40f2e2e53aff7b6ef59e",
        "span_id": "0xf4e2385d7b20499f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x56541a0185e41153",
    "start_time": "2023-11-28T09:07:06.393005Z",
    "end_time": "2023-11-28T09:07:08.244726Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is your name?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "I am an AI language model developed by OpenAI, and I don't have a personal name. You can simply refer to me as OpenAI Assistant. How can I assist you today?",
        "llm_usage_total_tokens": 50,
        "llm_usage_completion_tokens": 38,
        "llm_usage_prompt_tokens": 12
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adbcaada193ec80e08c1"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x537539c1688e40f2e2e53aff7b6ef59e",
        "span_id": "0x56541a0185e41153",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:07:06.349402Z",
    "end_time": "2023-11-28T09:07:08.245629Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is your name?&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49872,
        "http_route": "/api/completion_request/",
        "prompt": "What is your name?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoLbkYvRAp5Z0d2qlkhxxM8nThCy",
        "object": "chat.completion",
        "created": 1701162427,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "I am an AI language model developed by OpenAI, and I don't have a personal name. You can simply refer to me as OpenAI Assistant. How can I assist you today?",
        "finish_reason": "stop",
        "prompt_tokens": 12,
        "completion_tokens": 38,
        "total_tokens": 50,
        "response": "{'id': 'chatcmpl-8PoLbkYvRAp5Z0d2qlkhxxM8nThCy', 'object': 'chat.completion', 'created': 1701162427, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': \"I am an AI language model developed by OpenAI, and I don't have a personal name. You can simply refer to me as OpenAI Assistant. How can I assist you today?\"}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 12, 'completion_tokens': 38, 'total_tokens': 50}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adbcaada193ec80e08c2"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x537539c1688e40f2e2e53aff7b6ef59e",
        "span_id": "0xf808a05cd8145e6e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x56541a0185e41153",
    "start_time": "2023-11-28T09:07:08.246704Z",
    "end_time": "2023-11-28T09:07:08.247451Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565adbcaada193ec80e08c3"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x537539c1688e40f2e2e53aff7b6ef59e",
        "span_id": "0x0407c30307bd6f02",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x56541a0185e41153",
    "start_time": "2023-11-28T09:07:08.247833Z",
    "end_time": "2023-11-28T09:07:08.247961Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ade4aada193ec80e08c5"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x9ae6e55a80fc05a3d798dd3429d2f0b3",
        "span_id": "0x642d225479d8390c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xc5a2d9cf684f820a",
    "start_time": "2023-11-28T09:07:43.066908Z",
    "end_time": "2023-11-28T09:07:48.241468Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "How is gravity calculated?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "Gravity is calculated using Newton's law of universal gravitation, which states that the force of gravity between two objects is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers.\n\nThe formula for calculating the force of gravity (F) between two objects is:\n\nF = (G * m1 * m2) / r^2\n\nWhere:\n- F is the force of gravity\n- G is the gravitational constant (approximately 6.67430 × 10^-11 N m^2/kg^2)\n- m1 and m2 are the masses of the two objects\n- r is the distance between the centers of the two objects\n\nThis formula allows us to calculate the gravitational force between any two objects, such as the Earth and an object on its surface, or two planets in space.",
        "llm_usage_total_tokens": 183,
        "llm_usage_completion_tokens": 171,
        "llm_usage_prompt_tokens": 12
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ade4aada193ec80e08c6"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x9ae6e55a80fc05a3d798dd3429d2f0b3",
        "span_id": "0xc5a2d9cf684f820a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:07:42.806190Z",
    "end_time": "2023-11-28T09:07:48.242363Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=How is gravity calculated?&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49874,
        "http_route": "/api/completion_request/",
        "prompt": "How is gravity calculated?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoMC1ot3AbYRB2lNmCa2tCIYWuwQ",
        "object": "chat.completion",
        "created": 1701162464,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "Gravity is calculated using Newton's law of universal gravitation, which states that the force of gravity between two objects is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers.\n\nThe formula for calculating the force of gravity (F) between two objects is:\n\nF = (G * m1 * m2) / r^2\n\nWhere:\n- F is the force of gravity\n- G is the gravitational constant (approximately 6.67430 × 10^-11 N m^2/kg^2)\n- m1 and m2 are the masses of the two objects\n- r is the distance between the centers of the two objects\n\nThis formula allows us to calculate the gravitational force between any two objects, such as the Earth and an object on its surface, or two planets in space.",
        "finish_reason": "stop",
        "prompt_tokens": 12,
        "completion_tokens": 171,
        "total_tokens": 183,
        "response": "{'id': 'chatcmpl-8PoMC1ot3AbYRB2lNmCa2tCIYWuwQ', 'object': 'chat.completion', 'created': 1701162464, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': \"Gravity is calculated using Newton's law of universal gravitation, which states that the force of gravity between two objects is directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers.\\n\\nThe formula for calculating the force of gravity (F) between two objects is:\\n\\nF = (G * m1 * m2) / r^2\\n\\nWhere:\\n- F is the force of gravity\\n- G is the gravitational constant (approximately 6.67430 × 10^-11 N m^2/kg^2)\\n- m1 and m2 are the masses of the two objects\\n- r is the distance between the centers of the two objects\\n\\nThis formula allows us to calculate the gravitational force between any two objects, such as the Earth and an object on its surface, or two planets in space.\"}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 12, 'completion_tokens': 171, 'total_tokens': 183}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ade4aada193ec80e08c7"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x9ae6e55a80fc05a3d798dd3429d2f0b3",
        "span_id": "0xaadc803d166d360a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc5a2d9cf684f820a",
    "start_time": "2023-11-28T09:07:48.243471Z",
    "end_time": "2023-11-28T09:07:48.244230Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ade4aada193ec80e08c8"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x9ae6e55a80fc05a3d798dd3429d2f0b3",
        "span_id": "0x3d65f95800094c64",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc5a2d9cf684f820a",
    "start_time": "2023-11-28T09:07:48.244617Z",
    "end_time": "2023-11-28T09:07:48.244734Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae07aada193ec80e08ca"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x60e3739af9cc0cf8a06ec0fc5fc8276e",
        "span_id": "0x7758f008bdca61ff",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x54d81ea95670efee",
    "start_time": "2023-11-28T09:08:18.373330Z",
    "end_time": "2023-11-28T09:08:23.288151Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "In python code, how do i take a number as an input and return whether it is even or odd",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "To determine whether a number is even or odd in Python, you can use the modulo operator `%`. Here's an example code snippet:\n\n```python\ndef check_even_odd(number):\n    if number % 2 == 0:\n        return \"Even\"\n    else:\n        return \"Odd\"\n\n# Taking input from the user\nnum = int(input(\"Enter a number: \"))\n\n# Calling the function and printing the result\nresult = check_even_odd(num)\nprint(f\"The number {num} is {result}.\")\n```\n\nIn this code, the `check_even_odd` function takes a number as an argument and checks if it is divisible by 2 using the modulo operator `%`. If the remainder is 0, it returns \"Even\"; otherwise, it returns \"Odd\". The user is prompted to enter a number, and the function is called with that number as an argument. Finally, the result is printed.",
        "llm_usage_total_tokens": 214,
        "llm_usage_completion_tokens": 186,
        "llm_usage_prompt_tokens": 28
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae07aada193ec80e08cb"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x60e3739af9cc0cf8a06ec0fc5fc8276e",
        "span_id": "0x54d81ea95670efee",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:08:18.334968Z",
    "end_time": "2023-11-28T09:08:23.289072Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=In python code, how do i take a number as an input and return whether it is even or odd&model=openai&project__id=7b0ad838-1eae-4b28-b148-9bc8aaaaab03",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49875,
        "http_route": "/api/completion_request/",
        "prompt": "In python code, how do i take a number as an input and return whether it is even or odd",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoMk7CT2SeRY1qJcXtyN58jIit6n",
        "object": "chat.completion",
        "created": 1701162498,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "To determine whether a number is even or odd in Python, you can use the modulo operator `%`. Here's an example code snippet:\n\n```python\ndef check_even_odd(number):\n    if number % 2 == 0:\n        return \"Even\"\n    else:\n        return \"Odd\"\n\n# Taking input from the user\nnum = int(input(\"Enter a number: \"))\n\n# Calling the function and printing the result\nresult = check_even_odd(num)\nprint(f\"The number {num} is {result}.\")\n```\n\nIn this code, the `check_even_odd` function takes a number as an argument and checks if it is divisible by 2 using the modulo operator `%`. If the remainder is 0, it returns \"Even\"; otherwise, it returns \"Odd\". The user is prompted to enter a number, and the function is called with that number as an argument. Finally, the result is printed.",
        "finish_reason": "stop",
        "prompt_tokens": 28,
        "completion_tokens": 186,
        "total_tokens": 214,
        "response": "{'id': 'chatcmpl-8PoMk7CT2SeRY1qJcXtyN58jIit6n', 'object': 'chat.completion', 'created': 1701162498, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'To determine whether a number is even or odd in Python, you can use the modulo operator `%`. Here\\'s an example code snippet:\\n\\n```python\\ndef check_even_odd(number):\\n    if number % 2 == 0:\\n        return \"Even\"\\n    else:\\n        return \"Odd\"\\n\\n# Taking input from the user\\nnum = int(input(\"Enter a number: \"))\\n\\n# Calling the function and printing the result\\nresult = check_even_odd(num)\\nprint(f\"The number {num} is {result}.\")\\n```\\n\\nIn this code, the `check_even_odd` function takes a number as an argument and checks if it is divisible by 2 using the modulo operator `%`. If the remainder is 0, it returns \"Even\"; otherwise, it returns \"Odd\". The user is prompted to enter a number, and the function is called with that number as an argument. Finally, the result is printed.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 28, 'completion_tokens': 186, 'total_tokens': 214}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae07aada193ec80e08cc"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x60e3739af9cc0cf8a06ec0fc5fc8276e",
        "span_id": "0xb1d4c00ffac0e971",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x54d81ea95670efee",
    "start_time": "2023-11-28T09:08:23.290156Z",
    "end_time": "2023-11-28T09:08:23.291358Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae07aada193ec80e08cd"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x60e3739af9cc0cf8a06ec0fc5fc8276e",
        "span_id": "0x7e370fd9a0ea7157",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x54d81ea95670efee",
    "start_time": "2023-11-28T09:08:23.292078Z",
    "end_time": "2023-11-28T09:08:23.292315Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae28aada193ec80e08cf"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x35d08469531d579ac22523ac40465f11",
        "span_id": "0x3192477758e1aaa3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xb91616c4678c2b0b",
    "start_time": "2023-11-28T09:08:45.782044Z",
    "end_time": "2023-11-28T09:08:56.691381Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Give me a recipe for christmas cookies",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "Here's a classic recipe for Christmas sugar cookies:\n\nIngredients:\n- 2 ¾ cups all-purpose flour\n- 1 teaspoon baking soda\n- ½ teaspoon baking powder\n- 1 cup unsalted butter, softened\n- 1 ½ cups white sugar\n- 1 egg\n- 1 teaspoon vanilla extract\n- ½ teaspoon almond extract (optional)\n- Icing and sprinkles for decoration (optional)\n\nInstructions:\n1. Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper.\n2. In a medium bowl, whisk together the flour, baking soda, and baking powder. Set aside.\n3. In a large bowl, cream together the softened butter and sugar until light and fluffy.\n4. Beat in the egg, vanilla extract, and almond extract (if using) until well combined.\n5. Gradually add the dry ingredients to the wet mixture, mixing until the dough comes together. If the dough is too sticky, you can add a little more flour.\n6. Divide the dough into two equal portions. Wrap each portion in plastic wrap and refrigerate for at least 1 hour.\n7. On a lightly floured surface, roll out one portion of the dough to about ¼ inch thickness. Use cookie cutters to cut out desired shapes and transfer them to the prepared baking sheets, leaving a little space between each cookie.\n8. Bake for 8-10 minutes, or until the edges are lightly golden. Be careful not to overbake.\n9. Allow the cookies to cool on the baking sheets for a few minutes, then transfer them to a wire rack to cool completely.\n10. Once the cookies are completely cooled, you can decorate them with icing and sprinkles if desired. Allow the icing to set before storing the cookies in an airtight container.\n\nEnjoy your homemade Christmas sugar cookies!",
        "llm_usage_total_tokens": 393,
        "llm_usage_completion_tokens": 379,
        "llm_usage_prompt_tokens": 14
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae28aada193ec80e08d0"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x35d08469531d579ac22523ac40465f11",
        "span_id": "0xb91616c4678c2b0b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:08:45.744294Z",
    "end_time": "2023-11-28T09:08:56.692338Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Give me a recipe for christmas cookies&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49878,
        "http_route": "/api/completion_request/",
        "prompt": "Give me a recipe for christmas cookies",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoNCcA9ht8PNymljh6qJWYPxN9Jy",
        "object": "chat.completion",
        "created": 1701162526,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "Here's a classic recipe for Christmas sugar cookies:\n\nIngredients:\n- 2 ¾ cups all-purpose flour\n- 1 teaspoon baking soda\n- ½ teaspoon baking powder\n- 1 cup unsalted butter, softened\n- 1 ½ cups white sugar\n- 1 egg\n- 1 teaspoon vanilla extract\n- ½ teaspoon almond extract (optional)\n- Icing and sprinkles for decoration (optional)\n\nInstructions:\n1. Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper.\n2. In a medium bowl, whisk together the flour, baking soda, and baking powder. Set aside.\n3. In a large bowl, cream together the softened butter and sugar until light and fluffy.\n4. Beat in the egg, vanilla extract, and almond extract (if using) until well combined.\n5. Gradually add the dry ingredients to the wet mixture, mixing until the dough comes together. If the dough is too sticky, you can add a little more flour.\n6. Divide the dough into two equal portions. Wrap each portion in plastic wrap and refrigerate for at least 1 hour.\n7. On a lightly floured surface, roll out one portion of the dough to about ¼ inch thickness. Use cookie cutters to cut out desired shapes and transfer them to the prepared baking sheets, leaving a little space between each cookie.\n8. Bake for 8-10 minutes, or until the edges are lightly golden. Be careful not to overbake.\n9. Allow the cookies to cool on the baking sheets for a few minutes, then transfer them to a wire rack to cool completely.\n10. Once the cookies are completely cooled, you can decorate them with icing and sprinkles if desired. Allow the icing to set before storing the cookies in an airtight container.\n\nEnjoy your homemade Christmas sugar cookies!",
        "finish_reason": "stop",
        "prompt_tokens": 14,
        "completion_tokens": 379,
        "total_tokens": 393,
        "response": "{'id': 'chatcmpl-8PoNCcA9ht8PNymljh6qJWYPxN9Jy', 'object': 'chat.completion', 'created': 1701162526, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': \"Here's a classic recipe for Christmas sugar cookies:\\n\\nIngredients:\\n- 2 ¾ cups all-purpose flour\\n- 1 teaspoon baking soda\\n- ½ teaspoon baking powder\\n- 1 cup unsalted butter, softened\\n- 1 ½ cups white sugar\\n- 1 egg\\n- 1 teaspoon vanilla extract\\n- ½ teaspoon almond extract (optional)\\n- Icing and sprinkles for decoration (optional)\\n\\nInstructions:\\n1. Preheat your oven to 375°F (190°C). Line baking sheets with parchment paper.\\n2. In a medium bowl, whisk together the flour, baking soda, and baking powder. Set aside.\\n3. In a large bowl, cream together the softened butter and sugar until light and fluffy.\\n4. Beat in the egg, vanilla extract, and almond extract (if using) until well combined.\\n5. Gradually add the dry ingredients to the wet mixture, mixing until the dough comes together. If the dough is too sticky, you can add a little more flour.\\n6. Divide the dough into two equal portions. Wrap each portion in plastic wrap and refrigerate for at least 1 hour.\\n7. On a lightly floured surface, roll out one portion of the dough to about ¼ inch thickness. Use cookie cutters to cut out desired shapes and transfer them to the prepared baking sheets, leaving a little space between each cookie.\\n8. Bake for 8-10 minutes, or until the edges are lightly golden. Be careful not to overbake.\\n9. Allow the cookies to cool on the baking sheets for a few minutes, then transfer them to a wire rack to cool completely.\\n10. Once the cookies are completely cooled, you can decorate them with icing and sprinkles if desired. Allow the icing to set before storing the cookies in an airtight container.\\n\\nEnjoy your homemade Christmas sugar cookies!\"}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 14, 'completion_tokens': 379, 'total_tokens': 393}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae28aada193ec80e08d1"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x35d08469531d579ac22523ac40465f11",
        "span_id": "0x94582ffe80040f3e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb91616c4678c2b0b",
    "start_time": "2023-11-28T09:08:56.693522Z",
    "end_time": "2023-11-28T09:08:56.694236Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae28aada193ec80e08d2"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x35d08469531d579ac22523ac40465f11",
        "span_id": "0x9e342481b7f7990e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb91616c4678c2b0b",
    "start_time": "2023-11-28T09:08:56.694579Z",
    "end_time": "2023-11-28T09:08:56.694664Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae47aada193ec80e08d4"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x0f677528cb937a713695c58c93392376",
        "span_id": "0x3fb36e6edcb4ffe1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x9acc6edc26db7466",
    "start_time": "2023-11-28T09:09:23.881684Z",
    "end_time": "2023-11-28T09:09:27.885322Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "When can I see the northern lights in norway?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The northern lights, also known as the Aurora Borealis, can be seen in Norway from late September to early April. The best time to see them is during the winter months, from November to February, when the nights are longer and darker. However, it is important to note that the northern lights are a natural phenomenon and can be unpredictable, so there is no guarantee of seeing them even during the recommended months. It is advisable to check the local weather and aurora forecasts, as well as choose a location away from light pollution for the best chances of witnessing this spectacular display.",
        "llm_usage_total_tokens": 135,
        "llm_usage_completion_tokens": 117,
        "llm_usage_prompt_tokens": 18
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae47aada193ec80e08d5"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x0f677528cb937a713695c58c93392376",
        "span_id": "0x9acc6edc26db7466",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:09:23.841498Z",
    "end_time": "2023-11-28T09:09:27.886164Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=When can I see the northern lights in norway?&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49881,
        "http_route": "/api/completion_request/",
        "prompt": "When can I see the northern lights in norway?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoNoEtASD1ee7hDWec0f3sH80EjN",
        "object": "chat.completion",
        "created": 1701162564,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The northern lights, also known as the Aurora Borealis, can be seen in Norway from late September to early April. The best time to see them is during the winter months, from November to February, when the nights are longer and darker. However, it is important to note that the northern lights are a natural phenomenon and can be unpredictable, so there is no guarantee of seeing them even during the recommended months. It is advisable to check the local weather and aurora forecasts, as well as choose a location away from light pollution for the best chances of witnessing this spectacular display.",
        "finish_reason": "stop",
        "prompt_tokens": 18,
        "completion_tokens": 117,
        "total_tokens": 135,
        "response": "{'id': 'chatcmpl-8PoNoEtASD1ee7hDWec0f3sH80EjN', 'object': 'chat.completion', 'created': 1701162564, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The northern lights, also known as the Aurora Borealis, can be seen in Norway from late September to early April. The best time to see them is during the winter months, from November to February, when the nights are longer and darker. However, it is important to note that the northern lights are a natural phenomenon and can be unpredictable, so there is no guarantee of seeing them even during the recommended months. It is advisable to check the local weather and aurora forecasts, as well as choose a location away from light pollution for the best chances of witnessing this spectacular display.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 18, 'completion_tokens': 117, 'total_tokens': 135}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae47aada193ec80e08d6"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0f677528cb937a713695c58c93392376",
        "span_id": "0x4bd5d7dce77ce2ce",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9acc6edc26db7466",
    "start_time": "2023-11-28T09:09:27.887232Z",
    "end_time": "2023-11-28T09:09:27.888316Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae47aada193ec80e08d7"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0f677528cb937a713695c58c93392376",
        "span_id": "0xd7fe9b933a7b9439",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9acc6edc26db7466",
    "start_time": "2023-11-28T09:09:27.889008Z",
    "end_time": "2023-11-28T09:09:27.889139Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae5daada193ec80e08d9"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xa49fddb57b6dda874be001e58f6ff9e2",
        "span_id": "0x4f8df39c31dd76e7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x3edcc627d726ca82",
    "start_time": "2023-11-28T09:09:48.346278Z",
    "end_time": "2023-11-28T09:09:49.258547Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "How many fluid ounces fit in a metric liter?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "There are approximately 33.814 fluid ounces in a metric liter.",
        "llm_usage_total_tokens": 31,
        "llm_usage_completion_tokens": 14,
        "llm_usage_prompt_tokens": 17
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae5daada193ec80e08da"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xa49fddb57b6dda874be001e58f6ff9e2",
        "span_id": "0x3edcc627d726ca82",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:09:48.309418Z",
    "end_time": "2023-11-28T09:09:49.259399Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=How many fluid ounces fit in a metric liter?&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49883,
        "http_route": "/api/completion_request/",
        "prompt": "How many fluid ounces fit in a metric liter?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoOClivmaE0dp3lSB2b3wFiAcBQk",
        "object": "chat.completion",
        "created": 1701162588,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "There are approximately 33.814 fluid ounces in a metric liter.",
        "finish_reason": "stop",
        "prompt_tokens": 17,
        "completion_tokens": 14,
        "total_tokens": 31,
        "response": "{'id': 'chatcmpl-8PoOClivmaE0dp3lSB2b3wFiAcBQk', 'object': 'chat.completion', 'created': 1701162588, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'There are approximately 33.814 fluid ounces in a metric liter.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 17, 'completion_tokens': 14, 'total_tokens': 31}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae5daada193ec80e08db"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xa49fddb57b6dda874be001e58f6ff9e2",
        "span_id": "0x2cb2fac62fbb9338",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3edcc627d726ca82",
    "start_time": "2023-11-28T09:09:49.260090Z",
    "end_time": "2023-11-28T09:09:49.260688Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae5daada193ec80e08dc"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xa49fddb57b6dda874be001e58f6ff9e2",
        "span_id": "0x23323264c4f4ab99",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3edcc627d726ca82",
    "start_time": "2023-11-28T09:09:49.261128Z",
    "end_time": "2023-11-28T09:09:49.261257Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae98aada193ec80e08de"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x0037e1e93d1971b9a079eef90fa70782",
        "span_id": "0x76ae2b2b21fc8f3d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x1d465457aa1b0b4c",
    "start_time": "2023-11-28T09:10:47.563159Z",
    "end_time": "2023-11-28T09:10:48.505042Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "When was the roman empire?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The Roman Empire existed from 27 BC to 476 AD.",
        "llm_usage_total_tokens": 26,
        "llm_usage_completion_tokens": 13,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae98aada193ec80e08df"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x0037e1e93d1971b9a079eef90fa70782",
        "span_id": "0x1d465457aa1b0b4c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:10:47.523786Z",
    "end_time": "2023-11-28T09:10:48.505830Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=When was the roman empire?&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49885,
        "http_route": "/api/completion_request/",
        "prompt": "When was the roman empire?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoP9J8wFMW0aKveHnm4obK1HeRPQ",
        "object": "chat.completion",
        "created": 1701162647,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The Roman Empire existed from 27 BC to 476 AD.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 13,
        "total_tokens": 26,
        "response": "{'id': 'chatcmpl-8PoP9J8wFMW0aKveHnm4obK1HeRPQ', 'object': 'chat.completion', 'created': 1701162647, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The Roman Empire existed from 27 BC to 476 AD.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 13, 'total_tokens': 26}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae98aada193ec80e08e0"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0037e1e93d1971b9a079eef90fa70782",
        "span_id": "0xa622db663d87c0eb",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1d465457aa1b0b4c",
    "start_time": "2023-11-28T09:10:48.506851Z",
    "end_time": "2023-11-28T09:10:48.507589Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565ae98aada193ec80e08e1"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0037e1e93d1971b9a079eef90fa70782",
        "span_id": "0x8c6b86067f7243ee",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1d465457aa1b0b4c",
    "start_time": "2023-11-28T09:10:48.508581Z",
    "end_time": "2023-11-28T09:10:48.508855Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aea5aada193ec80e08e3"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xf6395ff953380fb3c0ae583fd3dcaeb0",
        "span_id": "0xa566fb2e1469b283",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x9e29b86b9fc34951",
    "start_time": "2023-11-28T09:11:00.981621Z",
    "end_time": "2023-11-28T09:11:01.855734Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Do dolphins lay eggs?",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "No, dolphins do not lay eggs. They are mammals and give birth to live young.",
        "llm_usage_total_tokens": 30,
        "llm_usage_completion_tokens": 18,
        "llm_usage_prompt_tokens": 12
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aea5aada193ec80e08e4"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xf6395ff953380fb3c0ae583fd3dcaeb0",
        "span_id": "0x9e29b86b9fc34951",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:11:00.943993Z",
    "end_time": "2023-11-28T09:11:01.856369Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Do dolphins lay eggs?&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49887,
        "http_route": "/api/completion_request/",
        "prompt": "Do dolphins lay eggs?",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoPNFWjP90hNAmD4Jx14kp5FqxeA",
        "object": "chat.completion",
        "created": 1701162661,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "No, dolphins do not lay eggs. They are mammals and give birth to live young.",
        "finish_reason": "stop",
        "prompt_tokens": 12,
        "completion_tokens": 18,
        "total_tokens": 30,
        "response": "{'id': 'chatcmpl-8PoPNFWjP90hNAmD4Jx14kp5FqxeA', 'object': 'chat.completion', 'created': 1701162661, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'No, dolphins do not lay eggs. They are mammals and give birth to live young.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 12, 'completion_tokens': 18, 'total_tokens': 30}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aea5aada193ec80e08e5"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xf6395ff953380fb3c0ae583fd3dcaeb0",
        "span_id": "0xce922e975d85e3aa",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9e29b86b9fc34951",
    "start_time": "2023-11-28T09:11:01.857199Z",
    "end_time": "2023-11-28T09:11:01.857946Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aea5aada193ec80e08e6"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xf6395ff953380fb3c0ae583fd3dcaeb0",
        "span_id": "0x41ead7271448c5f2",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9e29b86b9fc34951",
    "start_time": "2023-11-28T09:11:01.858526Z",
    "end_time": "2023-11-28T09:11:01.858615Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aeb4aada193ec80e08e8"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x4a586e2791ee0a2b5e3369fddd5b7148",
        "span_id": "0x3694ec7a6ffeae59",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x4caebda30d34fc47",
    "start_time": "2023-11-28T09:11:15.256943Z",
    "end_time": "2023-11-28T09:11:16.979656Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is the longest pregnancy time in the animal world",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The longest pregnancy time in the animal kingdom is found in the African elephant. The gestation period for an African elephant is approximately 22 months, which is almost two years.",
        "llm_usage_total_tokens": 52,
        "llm_usage_completion_tokens": 35,
        "llm_usage_prompt_tokens": 17
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aeb5aada193ec80e08e9"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x4a586e2791ee0a2b5e3369fddd5b7148",
        "span_id": "0x4caebda30d34fc47",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:11:15.221760Z",
    "end_time": "2023-11-28T09:11:16.980521Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is the longest pregnancy time in the animal world&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49888,
        "http_route": "/api/completion_request/",
        "prompt": "What is the longest pregnancy time in the animal world",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoPb6Phuff2YIVwSZ6BQw5txxk9B",
        "object": "chat.completion",
        "created": 1701162675,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The longest pregnancy time in the animal kingdom is found in the African elephant. The gestation period for an African elephant is approximately 22 months, which is almost two years.",
        "finish_reason": "stop",
        "prompt_tokens": 17,
        "completion_tokens": 35,
        "total_tokens": 52,
        "response": "{'id': 'chatcmpl-8PoPb6Phuff2YIVwSZ6BQw5txxk9B', 'object': 'chat.completion', 'created': 1701162675, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The longest pregnancy time in the animal kingdom is found in the African elephant. The gestation period for an African elephant is approximately 22 months, which is almost two years.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 17, 'completion_tokens': 35, 'total_tokens': 52}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aeb5aada193ec80e08ea"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x4a586e2791ee0a2b5e3369fddd5b7148",
        "span_id": "0xa90380b118ffa360",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x4caebda30d34fc47",
    "start_time": "2023-11-28T09:11:16.981634Z",
    "end_time": "2023-11-28T09:11:16.982349Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aeb5aada193ec80e08eb"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x4a586e2791ee0a2b5e3369fddd5b7148",
        "span_id": "0x3d3da6b93b7a08f9",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x4caebda30d34fc47",
    "start_time": "2023-11-28T09:11:16.982748Z",
    "end_time": "2023-11-28T09:11:16.982853Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aebdaada193ec80e08ed"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xde5f4cf32777f5f8ccea0c2d21e71b85",
        "span_id": "0xc2e096718d23b041",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x58ecd673da5a6eb0",
    "start_time": "2023-11-28T09:11:23.893539Z",
    "end_time": "2023-11-28T09:11:25.603292Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is the shortest pregnancy time in the animal world",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The shortest pregnancy time in the animal kingdom is found in the Virginia opossum (Didelphis virginiana), which has a gestation period of only 12-13 days.",
        "llm_usage_total_tokens": 54,
        "llm_usage_completion_tokens": 37,
        "llm_usage_prompt_tokens": 17
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aebdaada193ec80e08ee"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xde5f4cf32777f5f8ccea0c2d21e71b85",
        "span_id": "0x58ecd673da5a6eb0",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:11:23.855956Z",
    "end_time": "2023-11-28T09:11:25.604412Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is the shortest pregnancy time in the animal world&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49890,
        "http_route": "/api/completion_request/",
        "prompt": "What is the shortest pregnancy time in the animal world",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoPk4hFKooFn2XXq6l7loV7ETdRQ",
        "object": "chat.completion",
        "created": 1701162684,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The shortest pregnancy time in the animal kingdom is found in the Virginia opossum (Didelphis virginiana), which has a gestation period of only 12-13 days.",
        "finish_reason": "stop",
        "prompt_tokens": 17,
        "completion_tokens": 37,
        "total_tokens": 54,
        "response": "{'id': 'chatcmpl-8PoPk4hFKooFn2XXq6l7loV7ETdRQ', 'object': 'chat.completion', 'created': 1701162684, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The shortest pregnancy time in the animal kingdom is found in the Virginia opossum (Didelphis virginiana), which has a gestation period of only 12-13 days.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 17, 'completion_tokens': 37, 'total_tokens': 54}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aebdaada193ec80e08ef"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xde5f4cf32777f5f8ccea0c2d21e71b85",
        "span_id": "0x26c224eaf122dd21",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x58ecd673da5a6eb0",
    "start_time": "2023-11-28T09:11:25.605571Z",
    "end_time": "2023-11-28T09:11:25.606233Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aebdaada193ec80e08f0"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xde5f4cf32777f5f8ccea0c2d21e71b85",
        "span_id": "0x3418145d90b60d57",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x58ecd673da5a6eb0",
    "start_time": "2023-11-28T09:11:25.606618Z",
    "end_time": "2023-11-28T09:11:25.606716Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aec8aada193ec80e08f2"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x5deca0d1daec1e97f8feb5fc6839bce9",
        "span_id": "0x09928c1435ed938a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xea9d6765abb49f0e",
    "start_time": "2023-11-28T09:11:36.061708Z",
    "end_time": "2023-11-28T09:11:36.981338Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "Reply with the letter \"a\"",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "a",
        "llm_usage_total_tokens": 15,
        "llm_usage_completion_tokens": 1,
        "llm_usage_prompt_tokens": 14
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aec9aada193ec80e08f3"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x5deca0d1daec1e97f8feb5fc6839bce9",
        "span_id": "0xea9d6765abb49f0e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:11:36.025268Z",
    "end_time": "2023-11-28T09:11:36.982107Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=Reply with the letter \"a\"&model=openai&project__id=6e9b3538-c0a3-4e89-b545-e6b34d6abe1f ",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49891,
        "http_route": "/api/completion_request/",
        "prompt": "Reply with the letter \"a\"",
        "access_token": "2ad5a148735e55ae902ccc605efb44e971191e1dab4277bf56dce6fa376fbbce",
        "id": "chatcmpl-8PoPw3HiwkM4J91YuEYZzmNLkbrgF",
        "object": "chat.completion",
        "created": 1701162696,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "a",
        "finish_reason": "stop",
        "prompt_tokens": 14,
        "completion_tokens": 1,
        "total_tokens": 15,
        "response": "{'id': 'chatcmpl-8PoPw3HiwkM4J91YuEYZzmNLkbrgF', 'object': 'chat.completion', 'created': 1701162696, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'a'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 14, 'completion_tokens': 1, 'total_tokens': 15}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aec9aada193ec80e08f4"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x5deca0d1daec1e97f8feb5fc6839bce9",
        "span_id": "0x5aef4453b36402c5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xea9d6765abb49f0e",
    "start_time": "2023-11-28T09:11:36.983042Z",
    "end_time": "2023-11-28T09:11:36.983767Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565aec9aada193ec80e08f5"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x5deca0d1daec1e97f8feb5fc6839bce9",
        "span_id": "0xf0a8b4ea6bae7ab2",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xea9d6765abb49f0e",
    "start_time": "2023-11-28T09:11:36.984168Z",
    "end_time": "2023-11-28T09:11:36.984285Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b091aada193ec80e08f7"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x5c47404b0f191468ebd417fb7c75550f",
        "span_id": "0x620ba4a44ab8d622",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x88f20df81783cad3",
    "start_time": "2023-11-28T09:19:12.511037Z",
    "end_time": "2023-11-28T09:19:13.369642Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+1",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1+1 equals 2.",
        "llm_usage_total_tokens": 20,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b091aada193ec80e08f8"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x5c47404b0f191468ebd417fb7c75550f",
        "span_id": "0x88f20df81783cad3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:12.470373Z",
    "end_time": "2023-11-28T09:19:13.370317Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+1&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49931,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+1",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXIKd1NFbObcXFAjpk1WMQ1uZBO",
        "object": "chat.completion",
        "created": 1701163152,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1+1 equals 2.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20,
        "response": "{'id': 'chatcmpl-8PoXIKd1NFbObcXFAjpk1WMQ1uZBO', 'object': 'chat.completion', 'created': 1701163152, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1+1 equals 2.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 7, 'total_tokens': 20}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b091aada193ec80e08f9"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x5c47404b0f191468ebd417fb7c75550f",
        "span_id": "0x8659451baf55a1c1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x88f20df81783cad3",
    "start_time": "2023-11-28T09:19:13.371078Z",
    "end_time": "2023-11-28T09:19:13.371673Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b091aada193ec80e08fa"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x5c47404b0f191468ebd417fb7c75550f",
        "span_id": "0x54519861d050669e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x88f20df81783cad3",
    "start_time": "2023-11-28T09:19:13.371877Z",
    "end_time": "2023-11-28T09:19:13.371955Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b098aada193ec80e08fc"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x54e53ab8167fac8701fdbf6f713f1ae6",
        "span_id": "0xf514a4777042197d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x40274fb342b79ce4",
    "start_time": "2023-11-28T09:19:19.073379Z",
    "end_time": "2023-11-28T09:19:20.273221Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 2 equals 3.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b098aada193ec80e08fd"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x54e53ab8167fac8701fdbf6f713f1ae6",
        "span_id": "0x40274fb342b79ce4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:19.032637Z",
    "end_time": "2023-11-28T09:19:20.274104Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+2&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+2",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXP4DOv7MXXZ0sL4CxIy9KHIHzg",
        "object": "chat.completion",
        "created": 1701163159,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 2 equals 3.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXP4DOv7MXXZ0sL4CxIy9KHIHzg', 'object': 'chat.completion', 'created': 1701163159, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 2 equals 3.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b098aada193ec80e08fe"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x54e53ab8167fac8701fdbf6f713f1ae6",
        "span_id": "0x0e84b16e6ef64e45",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x40274fb342b79ce4",
    "start_time": "2023-11-28T09:19:20.275394Z",
    "end_time": "2023-11-28T09:19:20.276162Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b098aada193ec80e08ff"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x54e53ab8167fac8701fdbf6f713f1ae6",
        "span_id": "0xa226311190501902",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x40274fb342b79ce4",
    "start_time": "2023-11-28T09:19:20.276665Z",
    "end_time": "2023-11-28T09:19:20.276768Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09baada193ec80e0901"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xde865ef026b56e5fc4e104c80fbf26d3",
        "span_id": "0x4379ae7f94a5f570",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x6773ce14aed748db",
    "start_time": "2023-11-28T09:19:21.998074Z",
    "end_time": "2023-11-28T09:19:23.161046Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+3",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 3 equals 4.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09baada193ec80e0902"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xde865ef026b56e5fc4e104c80fbf26d3",
        "span_id": "0x6773ce14aed748db",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:21.963291Z",
    "end_time": "2023-11-28T09:19:23.161950Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+3&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+3",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXSOZb6O13p2Q5rVRsAZsakAMyV",
        "object": "chat.completion",
        "created": 1701163162,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 3 equals 4.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXSOZb6O13p2Q5rVRsAZsakAMyV', 'object': 'chat.completion', 'created': 1701163162, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 3 equals 4.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09baada193ec80e0903"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xde865ef026b56e5fc4e104c80fbf26d3",
        "span_id": "0x44948ef8be0bbe7d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x6773ce14aed748db",
    "start_time": "2023-11-28T09:19:23.162943Z",
    "end_time": "2023-11-28T09:19:23.163947Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09baada193ec80e0904"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xde865ef026b56e5fc4e104c80fbf26d3",
        "span_id": "0x8a8eedfddc571c5e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x6773ce14aed748db",
    "start_time": "2023-11-28T09:19:23.164402Z",
    "end_time": "2023-11-28T09:19:23.164512Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09daada193ec80e0906"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xb8caa0d8e2fb02d539443353735eee27",
        "span_id": "0x1c51d39bb1e62530",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x82060c5d5bb27e07",
    "start_time": "2023-11-28T09:19:24.783614Z",
    "end_time": "2023-11-28T09:19:25.530615Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 4 equals 5.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09daada193ec80e0907"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xb8caa0d8e2fb02d539443353735eee27",
        "span_id": "0x82060c5d5bb27e07",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:24.747257Z",
    "end_time": "2023-11-28T09:19:25.531358Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+4&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+4",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXVvlDYfnnLrvTvEhaSDetKb5RA",
        "object": "chat.completion",
        "created": 1701163165,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 4 equals 5.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXVvlDYfnnLrvTvEhaSDetKb5RA', 'object': 'chat.completion', 'created': 1701163165, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 4 equals 5.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09daada193ec80e0908"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xb8caa0d8e2fb02d539443353735eee27",
        "span_id": "0x1eb37fa35db4606d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x82060c5d5bb27e07",
    "start_time": "2023-11-28T09:19:25.532792Z",
    "end_time": "2023-11-28T09:19:25.533467Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b09daada193ec80e0909"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xb8caa0d8e2fb02d539443353735eee27",
        "span_id": "0xc1b2c978a3b22eda",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x82060c5d5bb27e07",
    "start_time": "2023-11-28T09:19:25.533827Z",
    "end_time": "2023-11-28T09:19:25.533915Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a1aada193ec80e090b"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x351ab9c0fd4ff022dd9bb2690c92a749",
        "span_id": "0x490836b1c8a3c5e5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xc3542c24b9fdc1f5",
    "start_time": "2023-11-28T09:19:28.253347Z",
    "end_time": "2023-11-28T09:19:29.363728Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+5",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 5 equals 6.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a1aada193ec80e090c"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x351ab9c0fd4ff022dd9bb2690c92a749",
        "span_id": "0xc3542c24b9fdc1f5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:28.214111Z",
    "end_time": "2023-11-28T09:19:29.364666Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+5&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+5",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXYxstsUJw67fA2hNttQggk4gD7",
        "object": "chat.completion",
        "created": 1701163168,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 5 equals 6.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXYxstsUJw67fA2hNttQggk4gD7', 'object': 'chat.completion', 'created': 1701163168, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 5 equals 6.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a1aada193ec80e090d"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x351ab9c0fd4ff022dd9bb2690c92a749",
        "span_id": "0x77dfdb37c7979cb5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc3542c24b9fdc1f5",
    "start_time": "2023-11-28T09:19:29.366075Z",
    "end_time": "2023-11-28T09:19:29.366977Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a1aada193ec80e090e"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x351ab9c0fd4ff022dd9bb2690c92a749",
        "span_id": "0x45c7ef91453efbdf",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc3542c24b9fdc1f5",
    "start_time": "2023-11-28T09:19:29.367533Z",
    "end_time": "2023-11-28T09:19:29.367664Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a3aada193ec80e0910"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x77402ba6365aa8f67981f8ccc5df6fc7",
        "span_id": "0xa5520c616810871d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x1505944cc56b81b3",
    "start_time": "2023-11-28T09:19:30.947895Z",
    "end_time": "2023-11-28T09:19:31.698799Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+6",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 6 equals 7.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a3aada193ec80e0911"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x77402ba6365aa8f67981f8ccc5df6fc7",
        "span_id": "0x1505944cc56b81b3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:30.911098Z",
    "end_time": "2023-11-28T09:19:31.700012Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+6&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+6",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXbSakSnHnkFgSlw3MU8gxDPMES",
        "object": "chat.completion",
        "created": 1701163171,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 6 equals 7.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXbSakSnHnkFgSlw3MU8gxDPMES', 'object': 'chat.completion', 'created': 1701163171, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 6 equals 7.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a3aada193ec80e0912"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x77402ba6365aa8f67981f8ccc5df6fc7",
        "span_id": "0xb4b4dadecc8b2e3e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1505944cc56b81b3",
    "start_time": "2023-11-28T09:19:31.700665Z",
    "end_time": "2023-11-28T09:19:31.701819Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a3aada193ec80e0913"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x77402ba6365aa8f67981f8ccc5df6fc7",
        "span_id": "0xf810011c855e2c45",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1505944cc56b81b3",
    "start_time": "2023-11-28T09:19:31.702090Z",
    "end_time": "2023-11-28T09:19:31.702170Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a6aada193ec80e0915"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xe626ebde0526940f3b33ee033efbf20c",
        "span_id": "0xad5fec1a1d08c66e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x8b6e1686b1c61d4a",
    "start_time": "2023-11-28T09:19:33.595345Z",
    "end_time": "2023-11-28T09:19:34.808634Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+7",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 7 equals 8.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a6aada193ec80e0916"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xe626ebde0526940f3b33ee033efbf20c",
        "span_id": "0x8b6e1686b1c61d4a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:33.560627Z",
    "end_time": "2023-11-28T09:19:34.809462Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+7&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+7",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXeuMbXB3KDgEhG9Eq9enYCuTW9",
        "object": "chat.completion",
        "created": 1701163174,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 7 equals 8.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXeuMbXB3KDgEhG9Eq9enYCuTW9', 'object': 'chat.completion', 'created': 1701163174, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 7 equals 8.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a6aada193ec80e0917"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xe626ebde0526940f3b33ee033efbf20c",
        "span_id": "0xc839dcd8931bdad6",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x8b6e1686b1c61d4a",
    "start_time": "2023-11-28T09:19:34.810499Z",
    "end_time": "2023-11-28T09:19:34.811286Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a6aada193ec80e0918"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xe626ebde0526940f3b33ee033efbf20c",
        "span_id": "0xc1a88c8cef1fefc1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x8b6e1686b1c61d4a",
    "start_time": "2023-11-28T09:19:34.811695Z",
    "end_time": "2023-11-28T09:19:34.811809Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a9aada193ec80e091a"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x8418ac724064e9796b5621db114d6968",
        "span_id": "0x048b0b7ba68961c6",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x3667dfb3ba5285e8",
    "start_time": "2023-11-28T09:19:36.536213Z",
    "end_time": "2023-11-28T09:19:37.669053Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+8",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 8 equals 9.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a9aada193ec80e091b"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x8418ac724064e9796b5621db114d6968",
        "span_id": "0x3667dfb3ba5285e8",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:36.496348Z",
    "end_time": "2023-11-28T09:19:37.669708Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+8&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+8",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXh1uThPKDDxdmWWNQIZYBIjID5",
        "object": "chat.completion",
        "created": 1701163177,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 8 equals 9.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXh1uThPKDDxdmWWNQIZYBIjID5', 'object': 'chat.completion', 'created': 1701163177, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 8 equals 9.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a9aada193ec80e091c"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x8418ac724064e9796b5621db114d6968",
        "span_id": "0x7b6f3059d0b61869",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3667dfb3ba5285e8",
    "start_time": "2023-11-28T09:19:37.670463Z",
    "end_time": "2023-11-28T09:19:37.671087Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0a9aada193ec80e091d"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x8418ac724064e9796b5621db114d6968",
        "span_id": "0xd72f4228a23b6b60",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3667dfb3ba5285e8",
    "start_time": "2023-11-28T09:19:37.671353Z",
    "end_time": "2023-11-28T09:19:37.671439Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0abaada193ec80e091f"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x936a24c481481651d966661874cddea6",
        "span_id": "0xb2d20d05e06330b2",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xe2489f2b904ce36f",
    "start_time": "2023-11-28T09:19:39.361146Z",
    "end_time": "2023-11-28T09:19:39.895014Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1+9",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1 + 9 equals 10.",
        "llm_usage_total_tokens": 21,
        "llm_usage_completion_tokens": 8,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0abaada193ec80e0920"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x936a24c481481651d966661874cddea6",
        "span_id": "0xe2489f2b904ce36f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:39.326116Z",
    "end_time": "2023-11-28T09:19:39.895931Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1+9&model=openai&project__id=457ac8f9-a9cb-462a-b75d-e290459cbfb0",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49933,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1+9",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXjHV0jQ400qfzk9JcjVZmVebXm",
        "object": "chat.completion",
        "created": 1701163179,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1 + 9 equals 10.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 8,
        "total_tokens": 21,
        "response": "{'id': 'chatcmpl-8PoXjHV0jQ400qfzk9JcjVZmVebXm', 'object': 'chat.completion', 'created': 1701163179, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1 + 9 equals 10.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 8, 'total_tokens': 21}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0abaada193ec80e0921"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x936a24c481481651d966661874cddea6",
        "span_id": "0x4111e25c5d523b32",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xe2489f2b904ce36f",
    "start_time": "2023-11-28T09:19:39.897133Z",
    "end_time": "2023-11-28T09:19:39.897736Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0abaada193ec80e0922"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x936a24c481481651d966661874cddea6",
        "span_id": "0x914eb77c09643fdf",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xe2489f2b904ce36f",
    "start_time": "2023-11-28T09:19:39.898034Z",
    "end_time": "2023-11-28T09:19:39.898115Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0b8aada193ec80e0924"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x67a277df498bd7a5a3ac22cf39616a9e",
        "span_id": "0xedccbf5231123bcd",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x9683e066d268dc56",
    "start_time": "2023-11-28T09:19:51.820016Z",
    "end_time": "2023-11-28T09:19:52.951817Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 1*1",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "1*1 equals 1.",
        "llm_usage_total_tokens": 20,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0b8aada193ec80e0925"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x67a277df498bd7a5a3ac22cf39616a9e",
        "span_id": "0x9683e066d268dc56",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:51.782797Z",
    "end_time": "2023-11-28T09:19:52.952762Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 1*1&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 1*1",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXwJ6uTkcAKgVHE6e3Wdz6HWlZ9",
        "object": "chat.completion",
        "created": 1701163192,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "1*1 equals 1.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20,
        "response": "{'id': 'chatcmpl-8PoXwJ6uTkcAKgVHE6e3Wdz6HWlZ9', 'object': 'chat.completion', 'created': 1701163192, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '1*1 equals 1.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 7, 'total_tokens': 20}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0b8aada193ec80e0926"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x67a277df498bd7a5a3ac22cf39616a9e",
        "span_id": "0xef1bb82653383b58",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9683e066d268dc56",
    "start_time": "2023-11-28T09:19:52.953796Z",
    "end_time": "2023-11-28T09:19:52.954531Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0b9aada193ec80e0927"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x67a277df498bd7a5a3ac22cf39616a9e",
        "span_id": "0x82f5096ca086a4d9",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9683e066d268dc56",
    "start_time": "2023-11-28T09:19:52.954927Z",
    "end_time": "2023-11-28T09:19:52.955031Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bcaada193ec80e0929"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x616a6ce9809d868812e9d376a6fc9097",
        "span_id": "0xb36a83f63bc49390",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xf1ca94c7cac2e27d",
    "start_time": "2023-11-28T09:19:55.641407Z",
    "end_time": "2023-11-28T09:19:56.353093Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 2*2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2*2 equals 4.",
        "llm_usage_total_tokens": 20,
        "llm_usage_completion_tokens": 7,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bcaada193ec80e092a"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x616a6ce9809d868812e9d376a6fc9097",
        "span_id": "0xf1ca94c7cac2e27d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:55.596393Z",
    "end_time": "2023-11-28T09:19:56.354710Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 2*2&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 2*2",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoXz9lvEsvPS9uyblTBmo5j6MLAx",
        "object": "chat.completion",
        "created": 1701163195,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2*2 equals 4.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 7,
        "total_tokens": 20,
        "response": "{'id': 'chatcmpl-8PoXz9lvEsvPS9uyblTBmo5j6MLAx', 'object': 'chat.completion', 'created': 1701163195, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2*2 equals 4.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 7, 'total_tokens': 20}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bcaada193ec80e092b"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x616a6ce9809d868812e9d376a6fc9097",
        "span_id": "0xf71e923427f71db5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xf1ca94c7cac2e27d",
    "start_time": "2023-11-28T09:19:56.355448Z",
    "end_time": "2023-11-28T09:19:56.356069Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bcaada193ec80e092c"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x616a6ce9809d868812e9d376a6fc9097",
        "span_id": "0xf17ace9bafe8b5ae",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xf1ca94c7cac2e27d",
    "start_time": "2023-11-28T09:19:56.356350Z",
    "end_time": "2023-11-28T09:19:56.356433Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bfaada193ec80e092e"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xba14168afbe235989320850440cd4fc5",
        "span_id": "0x219487bd1dbb9e9a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x46d7a5f10ab173c8",
    "start_time": "2023-11-28T09:19:58.480780Z",
    "end_time": "2023-11-28T09:19:59.674727Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 2*3",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2 multiplied by 3 is equal to 6.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bfaada193ec80e092f"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xba14168afbe235989320850440cd4fc5",
        "span_id": "0x46d7a5f10ab173c8",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:19:58.443339Z",
    "end_time": "2023-11-28T09:19:59.675594Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 2*3&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 2*3",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoY390BKcfS6ELm7JrBeT2MCRsOc",
        "object": "chat.completion",
        "created": 1701163199,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2 multiplied by 3 is equal to 6.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoY390BKcfS6ELm7JrBeT2MCRsOc', 'object': 'chat.completion', 'created': 1701163199, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2 multiplied by 3 is equal to 6.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bfaada193ec80e0930"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xba14168afbe235989320850440cd4fc5",
        "span_id": "0xf7694b7fa6e5379c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x46d7a5f10ab173c8",
    "start_time": "2023-11-28T09:19:59.676608Z",
    "end_time": "2023-11-28T09:19:59.677322Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0bfaada193ec80e0931"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xba14168afbe235989320850440cd4fc5",
        "span_id": "0x92a54b9882b683b3",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x46d7a5f10ab173c8",
    "start_time": "2023-11-28T09:19:59.677715Z",
    "end_time": "2023-11-28T09:19:59.677818Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c2aada193ec80e0933"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x0e531fb303eaa6a2b38f07dd39e23a95",
        "span_id": "0x8cad9228bdfd2a33",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x3371fa30855de13d",
    "start_time": "2023-11-28T09:20:01.371683Z",
    "end_time": "2023-11-28T09:20:02.453456Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 2*4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "2 multiplied by 4 equals 8.",
        "llm_usage_total_tokens": 22,
        "llm_usage_completion_tokens": 9,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c2aada193ec80e0934"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x0e531fb303eaa6a2b38f07dd39e23a95",
        "span_id": "0x3371fa30855de13d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:01.193848Z",
    "end_time": "2023-11-28T09:20:02.454073Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 2*4&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 2*4",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoY58t6SI7TP4HLS5LyXQfCnYmWS",
        "object": "chat.completion",
        "created": 1701163201,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "2 multiplied by 4 equals 8.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 9,
        "total_tokens": 22,
        "response": "{'id': 'chatcmpl-8PoY58t6SI7TP4HLS5LyXQfCnYmWS', 'object': 'chat.completion', 'created': 1701163201, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '2 multiplied by 4 equals 8.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 9, 'total_tokens': 22}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c2aada193ec80e0935"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0e531fb303eaa6a2b38f07dd39e23a95",
        "span_id": "0x26c666ef80c711d4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3371fa30855de13d",
    "start_time": "2023-11-28T09:20:02.454743Z",
    "end_time": "2023-11-28T09:20:02.455325Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c2aada193ec80e0936"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x0e531fb303eaa6a2b38f07dd39e23a95",
        "span_id": "0xd08b088e80e4a277",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x3371fa30855de13d",
    "start_time": "2023-11-28T09:20:02.455524Z",
    "end_time": "2023-11-28T09:20:02.455590Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c5aada193ec80e0938"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x23014ed6e51a98ef175ce11f432a2375",
        "span_id": "0xaa2c9f272f4fd07d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x1b5c5c1cfde758cf",
    "start_time": "2023-11-28T09:20:04.848643Z",
    "end_time": "2023-11-28T09:20:05.475250Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 3*4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "3 multiplied by 4 is equal to 12.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c5aada193ec80e0939"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x23014ed6e51a98ef175ce11f432a2375",
        "span_id": "0x1b5c5c1cfde758cf",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:04.813640Z",
    "end_time": "2023-11-28T09:20:05.476154Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 3*4&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 3*4",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoY8GIoIB3wn64msLPQSZqICkbQP",
        "object": "chat.completion",
        "created": 1701163204,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "3 multiplied by 4 is equal to 12.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoY8GIoIB3wn64msLPQSZqICkbQP', 'object': 'chat.completion', 'created': 1701163204, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '3 multiplied by 4 is equal to 12.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c5aada193ec80e093a"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x23014ed6e51a98ef175ce11f432a2375",
        "span_id": "0xd3d26a615e271be2",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1b5c5c1cfde758cf",
    "start_time": "2023-11-28T09:20:05.477174Z",
    "end_time": "2023-11-28T09:20:05.477904Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c5aada193ec80e093b"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x23014ed6e51a98ef175ce11f432a2375",
        "span_id": "0xf94bc61df25c5767",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x1b5c5c1cfde758cf",
    "start_time": "2023-11-28T09:20:05.478302Z",
    "end_time": "2023-11-28T09:20:05.478410Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c8aada193ec80e093d"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x01d04b3089571674b5996a4fe5abe32e",
        "span_id": "0x5d1ddc354912f9fe",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xb526762e92011220",
    "start_time": "2023-11-28T09:20:07.988190Z",
    "end_time": "2023-11-28T09:20:08.722902Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 3*5",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "3 multiplied by 5 is equal to 15.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c8aada193ec80e093e"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x01d04b3089571674b5996a4fe5abe32e",
        "span_id": "0xb526762e92011220",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:07.947701Z",
    "end_time": "2023-11-28T09:20:08.723898Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 3*5&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 3*5",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYCIeumH0M0tAyjS1IlpFCC5wV8",
        "object": "chat.completion",
        "created": 1701163208,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "3 multiplied by 5 is equal to 15.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoYCIeumH0M0tAyjS1IlpFCC5wV8', 'object': 'chat.completion', 'created': 1701163208, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '3 multiplied by 5 is equal to 15.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c8aada193ec80e093f"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x01d04b3089571674b5996a4fe5abe32e",
        "span_id": "0xa2b966135a4815dd",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb526762e92011220",
    "start_time": "2023-11-28T09:20:08.724942Z",
    "end_time": "2023-11-28T09:20:08.725679Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0c8aada193ec80e0940"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x01d04b3089571674b5996a4fe5abe32e",
        "span_id": "0xb62726c6ce9a83e5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb526762e92011220",
    "start_time": "2023-11-28T09:20:08.726074Z",
    "end_time": "2023-11-28T09:20:08.726179Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0cbaada193ec80e0942"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x49a4b47670457b209f388ce5c284ca3b",
        "span_id": "0x7d9d2ec9a6351cea",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x006de08576564888",
    "start_time": "2023-11-28T09:20:10.162335Z",
    "end_time": "2023-11-28T09:20:11.609998Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 3*6",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "3 multiplied by 6 is equal to 18.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0cbaada193ec80e0943"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x49a4b47670457b209f388ce5c284ca3b",
        "span_id": "0x006de08576564888",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:10.129284Z",
    "end_time": "2023-11-28T09:20:11.611573Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 3*6&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 3*6",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYEpt3SuNAEtcIsCMYMItPzoXB8",
        "object": "chat.completion",
        "created": 1701163210,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "3 multiplied by 6 is equal to 18.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoYEpt3SuNAEtcIsCMYMItPzoXB8', 'object': 'chat.completion', 'created': 1701163210, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '3 multiplied by 6 is equal to 18.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0cbaada193ec80e0944"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x49a4b47670457b209f388ce5c284ca3b",
        "span_id": "0x7629812f31c1a802",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x006de08576564888",
    "start_time": "2023-11-28T09:20:11.612512Z",
    "end_time": "2023-11-28T09:20:11.613216Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0cbaada193ec80e0945"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x49a4b47670457b209f388ce5c284ca3b",
        "span_id": "0x652ede901deb1c6d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x006de08576564888",
    "start_time": "2023-11-28T09:20:11.613975Z",
    "end_time": "2023-11-28T09:20:11.614184Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ceaada193ec80e0947"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x451ed5807fc99a33c9ea508fc9dfb633",
        "span_id": "0x612fcac003372ad5",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xb5ca4b858e6fb2e1",
    "start_time": "2023-11-28T09:20:13.408685Z",
    "end_time": "2023-11-28T09:20:14.299849Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 3*11",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "3 multiplied by 11 is equal to 33.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ceaada193ec80e0948"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x451ed5807fc99a33c9ea508fc9dfb633",
        "span_id": "0xb5ca4b858e6fb2e1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:13.357487Z",
    "end_time": "2023-11-28T09:20:14.300228Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 3*11&model=openai&project__id=24b42650-f7af-4a8c-afc4-82c5f95ea9ee",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49937,
        "http_route": "/api/completion_request/",
        "prompt": "What is 3*11",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYHKzMDdqwYQl8YuvMpMWixDlcJ",
        "object": "chat.completion",
        "created": 1701163213,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "3 multiplied by 11 is equal to 33.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoYHKzMDdqwYQl8YuvMpMWixDlcJ', 'object': 'chat.completion', 'created': 1701163213, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '3 multiplied by 11 is equal to 33.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ceaada193ec80e0949"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x451ed5807fc99a33c9ea508fc9dfb633",
        "span_id": "0x884a6b19a85f568a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb5ca4b858e6fb2e1",
    "start_time": "2023-11-28T09:20:14.300707Z",
    "end_time": "2023-11-28T09:20:14.301014Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ceaada193ec80e094a"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x451ed5807fc99a33c9ea508fc9dfb633",
        "span_id": "0x0544b9d8ebddb483",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb5ca4b858e6fb2e1",
    "start_time": "2023-11-28T09:20:14.301199Z",
    "end_time": "2023-11-28T09:20:14.301248Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0d8aada193ec80e094c"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x97df9b2fd140d874bcbbbc9d8dc6d745",
        "span_id": "0x5c269eead417ecfc",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x5ce28f9e70354d52",
    "start_time": "2023-11-28T09:20:22.616810Z",
    "end_time": "2023-11-28T09:20:24.212121Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 311-3",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "311-3 is a numerical expression that represents the subtraction of 3 from 311. The result of this subtraction is 308.",
        "llm_usage_total_tokens": 40,
        "llm_usage_completion_tokens": 27,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0d8aada193ec80e094d"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x97df9b2fd140d874bcbbbc9d8dc6d745",
        "span_id": "0x5ce28f9e70354d52",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:22.582736Z",
    "end_time": "2023-11-28T09:20:24.213085Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 311-3&model=openai&project__id=3b198991-5671-4535-a3c4-b0d008478e6c",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49940,
        "http_route": "/api/completion_request/",
        "prompt": "What is 311-3",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYR1anqSGVZsKjYJDitdgszV6TD",
        "object": "chat.completion",
        "created": 1701163223,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "311-3 is a numerical expression that represents the subtraction of 3 from 311. The result of this subtraction is 308.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 27,
        "total_tokens": 40,
        "response": "{'id': 'chatcmpl-8PoYR1anqSGVZsKjYJDitdgszV6TD', 'object': 'chat.completion', 'created': 1701163223, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '311-3 is a numerical expression that represents the subtraction of 3 from 311. The result of this subtraction is 308.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 27, 'total_tokens': 40}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0d8aada193ec80e094e"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x97df9b2fd140d874bcbbbc9d8dc6d745",
        "span_id": "0xc53de805cde2e8df",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x5ce28f9e70354d52",
    "start_time": "2023-11-28T09:20:24.214425Z",
    "end_time": "2023-11-28T09:20:24.215191Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0d8aada193ec80e094f"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x97df9b2fd140d874bcbbbc9d8dc6d745",
        "span_id": "0x1cbb2784a59a7224",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x5ce28f9e70354d52",
    "start_time": "2023-11-28T09:20:24.215741Z",
    "end_time": "2023-11-28T09:20:24.216172Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e2aada193ec80e0951"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xbeac24ac0d60e79c602362c7a8873826",
        "span_id": "0x5b9cfe3ddf212583",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xfbb70ae922af967d",
    "start_time": "2023-11-28T09:20:33.348557Z",
    "end_time": "2023-11-28T09:20:34.595663Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31-5",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The difference between 31 and 5 is 26.",
        "llm_usage_total_tokens": 25,
        "llm_usage_completion_tokens": 12,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e2aada193ec80e0952"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xbeac24ac0d60e79c602362c7a8873826",
        "span_id": "0xfbb70ae922af967d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:33.313370Z",
    "end_time": "2023-11-28T09:20:34.596405Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31-5&model=openai&project__id=3b198991-5671-4535-a3c4-b0d008478e6c",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49941,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31-5",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYbpqhhQzDBQMRPCWW6OuKe0mf9",
        "object": "chat.completion",
        "created": 1701163233,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The difference between 31 and 5 is 26.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 12,
        "total_tokens": 25,
        "response": "{'id': 'chatcmpl-8PoYbpqhhQzDBQMRPCWW6OuKe0mf9', 'object': 'chat.completion', 'created': 1701163233, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The difference between 31 and 5 is 26.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 12, 'total_tokens': 25}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e2aada193ec80e0953"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xbeac24ac0d60e79c602362c7a8873826",
        "span_id": "0x7e653acfb5de5228",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xfbb70ae922af967d",
    "start_time": "2023-11-28T09:20:34.597524Z",
    "end_time": "2023-11-28T09:20:34.598237Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e2aada193ec80e0954"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xbeac24ac0d60e79c602362c7a8873826",
        "span_id": "0x19a4b16d5745ca63",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xfbb70ae922af967d",
    "start_time": "2023-11-28T09:20:34.600250Z",
    "end_time": "2023-11-28T09:20:34.600368Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e5aada193ec80e0956"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x157cee3c8c7bc6b3ae347e48357f5c7f",
        "span_id": "0x54ca8a57811c945f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xdca523d1caa6b4a8",
    "start_time": "2023-11-28T09:20:36.496714Z",
    "end_time": "2023-11-28T09:20:37.795052Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31-7",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The difference between 31 and 7 is 24.",
        "llm_usage_total_tokens": 25,
        "llm_usage_completion_tokens": 12,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e5aada193ec80e0957"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x157cee3c8c7bc6b3ae347e48357f5c7f",
        "span_id": "0xdca523d1caa6b4a8",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:36.464476Z",
    "end_time": "2023-11-28T09:20:37.795916Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31-7&model=openai&project__id=3b198991-5671-4535-a3c4-b0d008478e6c",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49941,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31-7",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYfCgCg4Bhhylbtx9brQGI5MWAa",
        "object": "chat.completion",
        "created": 1701163237,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The difference between 31 and 7 is 24.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 12,
        "total_tokens": 25,
        "response": "{'id': 'chatcmpl-8PoYfCgCg4Bhhylbtx9brQGI5MWAa', 'object': 'chat.completion', 'created': 1701163237, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The difference between 31 and 7 is 24.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 12, 'total_tokens': 25}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e5aada193ec80e0958"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x157cee3c8c7bc6b3ae347e48357f5c7f",
        "span_id": "0x4b163efb109cc891",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xdca523d1caa6b4a8",
    "start_time": "2023-11-28T09:20:37.797050Z",
    "end_time": "2023-11-28T09:20:37.798013Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e5aada193ec80e0959"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x157cee3c8c7bc6b3ae347e48357f5c7f",
        "span_id": "0x3b70dec1ea0b1b94",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xdca523d1caa6b4a8",
    "start_time": "2023-11-28T09:20:37.798536Z",
    "end_time": "2023-11-28T09:20:37.798723Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e8aada193ec80e095b"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x38b798c7f9fb05c879df8491fd773ef9",
        "span_id": "0x7834ff9a22c701f7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x491c77333795e551",
    "start_time": "2023-11-28T09:20:39.697871Z",
    "end_time": "2023-11-28T09:20:40.882594Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31-91",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The result of 31-91 is -60.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e8aada193ec80e095c"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x38b798c7f9fb05c879df8491fd773ef9",
        "span_id": "0x491c77333795e551",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:39.661758Z",
    "end_time": "2023-11-28T09:20:40.883050Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31-91&model=openai&project__id=3b198991-5671-4535-a3c4-b0d008478e6c",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49941,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31-91",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYi9AjBqHydZ9EmbIzaSIjJhh9P",
        "object": "chat.completion",
        "created": 1701163240,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The result of 31-91 is -60.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoYi9AjBqHydZ9EmbIzaSIjJhh9P', 'object': 'chat.completion', 'created': 1701163240, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The result of 31-91 is -60.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e8aada193ec80e095d"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x38b798c7f9fb05c879df8491fd773ef9",
        "span_id": "0xcd306e049ab663f1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x491c77333795e551",
    "start_time": "2023-11-28T09:20:40.883523Z",
    "end_time": "2023-11-28T09:20:40.883802Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0e8aada193ec80e095e"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x38b798c7f9fb05c879df8491fd773ef9",
        "span_id": "0x7650fd107ad2f119",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x491c77333795e551",
    "start_time": "2023-11-28T09:20:40.884022Z",
    "end_time": "2023-11-28T09:20:40.884071Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0f7aada193ec80e0960"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x402d7b79ebedb55a9cfc0e952b24c3c6",
        "span_id": "0x5df10fa8c4e87298",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x2044eaa0744b418c",
    "start_time": "2023-11-28T09:20:53.785544Z",
    "end_time": "2023-11-28T09:20:55.007387Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31/1",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "31 divided by 1 is equal to 31.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0f7aada193ec80e0961"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x402d7b79ebedb55a9cfc0e952b24c3c6",
        "span_id": "0x2044eaa0744b418c",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:53.747077Z",
    "end_time": "2023-11-28T09:20:55.009040Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31/1&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31/1",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoYwmGswuzwVTahNu4YWzI43Ooxm",
        "object": "chat.completion",
        "created": 1701163254,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "31 divided by 1 is equal to 31.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoYwmGswuzwVTahNu4YWzI43Ooxm', 'object': 'chat.completion', 'created': 1701163254, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '31 divided by 1 is equal to 31.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0f7aada193ec80e0962"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x402d7b79ebedb55a9cfc0e952b24c3c6",
        "span_id": "0x70b4f7691257f982",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x2044eaa0744b418c",
    "start_time": "2023-11-28T09:20:55.009971Z",
    "end_time": "2023-11-28T09:20:55.010669Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0f7aada193ec80e0963"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x402d7b79ebedb55a9cfc0e952b24c3c6",
        "span_id": "0x366a8720c41f806d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x2044eaa0744b418c",
    "start_time": "2023-11-28T09:20:55.011046Z",
    "end_time": "2023-11-28T09:20:55.011145Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0fcaada193ec80e0965"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x67ccd44e63868c903fa9556e661d69a3",
        "span_id": "0xf2d7d087261aab46",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xab72ad36ac70a6fc",
    "start_time": "2023-11-28T09:20:59.664557Z",
    "end_time": "2023-11-28T09:21:00.884117Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31/5",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "31/5 is equal to 6.2.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0fcaada193ec80e0966"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x67ccd44e63868c903fa9556e661d69a3",
        "span_id": "0xab72ad36ac70a6fc",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:20:59.628005Z",
    "end_time": "2023-11-28T09:21:00.885328Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31/5&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31/5",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZ2h6WqIpr5pl7osB9ca9NbRnMY",
        "object": "chat.completion",
        "created": 1701163260,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "31/5 is equal to 6.2.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoZ2h6WqIpr5pl7osB9ca9NbRnMY', 'object': 'chat.completion', 'created': 1701163260, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '31/5 is equal to 6.2.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0fcaada193ec80e0967"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x67ccd44e63868c903fa9556e661d69a3",
        "span_id": "0xa9a9fddaccdb6c49",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xab72ad36ac70a6fc",
    "start_time": "2023-11-28T09:21:00.886506Z",
    "end_time": "2023-11-28T09:21:00.887260Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0fcaada193ec80e0968"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x67ccd44e63868c903fa9556e661d69a3",
        "span_id": "0x5a6332a74de10f19",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xab72ad36ac70a6fc",
    "start_time": "2023-11-28T09:21:00.887667Z",
    "end_time": "2023-11-28T09:21:00.887770Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ffaada193ec80e096a"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x09cccafe4853096741eb5d39dc11583e",
        "span_id": "0xb27fbdcc22bc680f",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x95649986fbb36279",
    "start_time": "2023-11-28T09:21:02.722611Z",
    "end_time": "2023-11-28T09:21:03.564971Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31/2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "31/2 is equal to 15.5.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ffaada193ec80e096b"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x09cccafe4853096741eb5d39dc11583e",
        "span_id": "0x95649986fbb36279",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:02.682054Z",
    "end_time": "2023-11-28T09:21:03.565785Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31/2&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31/2",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZ5QAGZX9OYZQLmahLkxU8F9B1N",
        "object": "chat.completion",
        "created": 1701163263,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "31/2 is equal to 15.5.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoZ5QAGZX9OYZQLmahLkxU8F9B1N', 'object': 'chat.completion', 'created': 1701163263, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '31/2 is equal to 15.5.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ffaada193ec80e096c"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x09cccafe4853096741eb5d39dc11583e",
        "span_id": "0x54c6e4d60cda3b52",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x95649986fbb36279",
    "start_time": "2023-11-28T09:21:03.567050Z",
    "end_time": "2023-11-28T09:21:03.567818Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b0ffaada193ec80e096d"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x09cccafe4853096741eb5d39dc11583e",
        "span_id": "0x6d68b5e25aebec98",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x95649986fbb36279",
    "start_time": "2023-11-28T09:21:03.568346Z",
    "end_time": "2023-11-28T09:21:03.568458Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b102aada193ec80e096f"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x87563a7bd1bd127041b82d5931721844",
        "span_id": "0x1dcccf71ec20f92a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xc3bd9aaa5c783db8",
    "start_time": "2023-11-28T09:21:06.055063Z",
    "end_time": "2023-11-28T09:21:06.792309Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 31/31",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "31/31 is equal to 1.",
        "llm_usage_total_tokens": 22,
        "llm_usage_completion_tokens": 9,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b102aada193ec80e0970"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x87563a7bd1bd127041b82d5931721844",
        "span_id": "0xc3bd9aaa5c783db8",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:06.015990Z",
    "end_time": "2023-11-28T09:21:06.793095Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 31/31&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 31/31",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZ8WE1d1P9Bn5lNKb3Nrw0ZZxTf",
        "object": "chat.completion",
        "created": 1701163266,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "31/31 is equal to 1.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 9,
        "total_tokens": 22,
        "response": "{'id': 'chatcmpl-8PoZ8WE1d1P9Bn5lNKb3Nrw0ZZxTf', 'object': 'chat.completion', 'created': 1701163266, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '31/31 is equal to 1.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 9, 'total_tokens': 22}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b102aada193ec80e0971"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x87563a7bd1bd127041b82d5931721844",
        "span_id": "0xa9f680fdfeab78c2",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc3bd9aaa5c783db8",
    "start_time": "2023-11-28T09:21:06.793869Z",
    "end_time": "2023-11-28T09:21:06.794550Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b102aada193ec80e0972"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x87563a7bd1bd127041b82d5931721844",
        "span_id": "0xb8a98034f76bee0e",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xc3bd9aaa5c783db8",
    "start_time": "2023-11-28T09:21:06.794801Z",
    "end_time": "2023-11-28T09:21:06.794878Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b105aada193ec80e0974"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x460ff07e70fcc1c55ce5008d0ecebb5f",
        "span_id": "0x4be435db3fed0fb0",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0xb68ca9ffb24f6ab4",
    "start_time": "2023-11-28T09:21:09.091481Z",
    "end_time": "2023-11-28T09:21:09.953564Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 62/31",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "62 divided by 31 is equal to 2.",
        "llm_usage_total_tokens": 24,
        "llm_usage_completion_tokens": 11,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b105aada193ec80e0975"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x460ff07e70fcc1c55ce5008d0ecebb5f",
        "span_id": "0xb68ca9ffb24f6ab4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:09.048553Z",
    "end_time": "2023-11-28T09:21:09.954212Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 62/31&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 62/31",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZBVjxXu46Npzafjfvv5BFRXuWn",
        "object": "chat.completion",
        "created": 1701163269,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "62 divided by 31 is equal to 2.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 11,
        "total_tokens": 24,
        "response": "{'id': 'chatcmpl-8PoZBVjxXu46Npzafjfvv5BFRXuWn', 'object': 'chat.completion', 'created': 1701163269, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '62 divided by 31 is equal to 2.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 11, 'total_tokens': 24}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b106aada193ec80e0976"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x460ff07e70fcc1c55ce5008d0ecebb5f",
        "span_id": "0xbdaa5e6e2fe8b985",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb68ca9ffb24f6ab4",
    "start_time": "2023-11-28T09:21:09.954871Z",
    "end_time": "2023-11-28T09:21:09.955585Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b106aada193ec80e0977"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x460ff07e70fcc1c55ce5008d0ecebb5f",
        "span_id": "0xd4126b0fb33da30b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0xb68ca9ffb24f6ab4",
    "start_time": "2023-11-28T09:21:09.956080Z",
    "end_time": "2023-11-28T09:21:09.956197Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b109aada193ec80e0979"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xa2a4be01f963b580baa48bc67dd5eab4",
        "span_id": "0xe5fed8439d8f1c17",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x9310936d36b3e843",
    "start_time": "2023-11-28T09:21:11.682643Z",
    "end_time": "2023-11-28T09:21:13.049108Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 62/2",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The answer to 62 divided by 2 is 31.",
        "llm_usage_total_tokens": 26,
        "llm_usage_completion_tokens": 13,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b109aada193ec80e097a"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xa2a4be01f963b580baa48bc67dd5eab4",
        "span_id": "0x9310936d36b3e843",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:11.647708Z",
    "end_time": "2023-11-28T09:21:13.051857Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 62/2&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 62/2",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZE706waBpf6t2LMLvBBxNf1wBr",
        "object": "chat.completion",
        "created": 1701163272,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The answer to 62 divided by 2 is 31.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 13,
        "total_tokens": 26,
        "response": "{'id': 'chatcmpl-8PoZE706waBpf6t2LMLvBBxNf1wBr', 'object': 'chat.completion', 'created': 1701163272, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The answer to 62 divided by 2 is 31.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 13, 'total_tokens': 26}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b109aada193ec80e097b"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xa2a4be01f963b580baa48bc67dd5eab4",
        "span_id": "0xbabed3b0bef51b66",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9310936d36b3e843",
    "start_time": "2023-11-28T09:21:13.053212Z",
    "end_time": "2023-11-28T09:21:13.053799Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b109aada193ec80e097c"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xa2a4be01f963b580baa48bc67dd5eab4",
        "span_id": "0x13bf19c2486eb8fa",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x9310936d36b3e843",
    "start_time": "2023-11-28T09:21:13.054076Z",
    "end_time": "2023-11-28T09:21:13.054147Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10baada193ec80e097e"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0x48c8468cfdd4b71927811d4bf5df16dc",
        "span_id": "0x4955ca2043b3d1c4",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x962699725e99ad48",
    "start_time": "2023-11-28T09:21:14.480084Z",
    "end_time": "2023-11-28T09:21:15.727987Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 62/4",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "62 divided by 4 is equal to 15.5.",
        "llm_usage_total_tokens": 26,
        "llm_usage_completion_tokens": 13,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10baada193ec80e097f"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0x48c8468cfdd4b71927811d4bf5df16dc",
        "span_id": "0x962699725e99ad48",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:14.444726Z",
    "end_time": "2023-11-28T09:21:15.729170Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 62/4&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 62/4",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZH8aIZ4hI0Z3Jde9xZeEDgmDcZ",
        "object": "chat.completion",
        "created": 1701163275,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "62 divided by 4 is equal to 15.5.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 13,
        "total_tokens": 26,
        "response": "{'id': 'chatcmpl-8PoZH8aIZ4hI0Z3Jde9xZeEDgmDcZ', 'object': 'chat.completion', 'created': 1701163275, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': '62 divided by 4 is equal to 15.5.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 13, 'total_tokens': 26}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10baada193ec80e0980"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x48c8468cfdd4b71927811d4bf5df16dc",
        "span_id": "0x41a05cae31a46d64",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x962699725e99ad48",
    "start_time": "2023-11-28T09:21:15.730299Z",
    "end_time": "2023-11-28T09:21:15.731106Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10baada193ec80e0981"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0x48c8468cfdd4b71927811d4bf5df16dc",
        "span_id": "0xa6b1db19c070ead1",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x962699725e99ad48",
    "start_time": "2023-11-28T09:21:15.731641Z",
    "end_time": "2023-11-28T09:21:15.731765Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10faada193ec80e0983"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xbffafd982c1c5c9a773c0bc536ad396c",
        "span_id": "0x36161a5ee794a19a",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x4a4ef387342337a7",
    "start_time": "2023-11-28T09:21:18.306654Z",
    "end_time": "2023-11-28T09:21:19.144726Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 62/8",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The result of 62 divided by 8 is 7.75.",
        "llm_usage_total_tokens": 28,
        "llm_usage_completion_tokens": 15,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10faada193ec80e0984"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xbffafd982c1c5c9a773c0bc536ad396c",
        "span_id": "0x4a4ef387342337a7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:18.262058Z",
    "end_time": "2023-11-28T09:21:19.145624Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 62/8&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 62/8",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZKvPIRqLenY22ZulCOjrTUJZwH",
        "object": "chat.completion",
        "created": 1701163278,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The result of 62 divided by 8 is 7.75.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 15,
        "total_tokens": 28,
        "response": "{'id': 'chatcmpl-8PoZKvPIRqLenY22ZulCOjrTUJZwH', 'object': 'chat.completion', 'created': 1701163278, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The result of 62 divided by 8 is 7.75.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 15, 'total_tokens': 28}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10faada193ec80e0985"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xbffafd982c1c5c9a773c0bc536ad396c",
        "span_id": "0x56b3688d46b66905",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x4a4ef387342337a7",
    "start_time": "2023-11-28T09:21:19.146655Z",
    "end_time": "2023-11-28T09:21:19.147418Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b10faada193ec80e0986"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xbffafd982c1c5c9a773c0bc536ad396c",
        "span_id": "0xc0c30f47d32f57dc",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x4a4ef387342337a7",
    "start_time": "2023-11-28T09:21:19.148606Z",
    "end_time": "2023-11-28T09:21:19.148751Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b115aada193ec80e0988"
    },
    "name": "openai.chat",
    "context": {
        "trace_id": "0xf620ef8f01b73ffe06aee58d71ff4b5a",
        "span_id": "0x72fd603a6dfff56d",
        "trace_state": "[]"
    },
    "kind": "SpanKind.CLIENT",
    "parent_id": "0x44891f8c4fa61aa7",
    "start_time": "2023-11-28T09:21:24.176473Z",
    "end_time": "2023-11-28T09:21:25.266850Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "llm_vendor": "OpenAI",
        "llm_request_type": "chat",
        "openai_api_base": "https://api.openai.com/v1",
        "openai_api_type": "open_ai",
        "llm_request_model": "gpt-3.5-turbo",
        "llm_temperature": 0.0,
        "llm_prompts_0_role": "user",
        "llm_prompts_0_content": "What is 62/11",
        "llm_response_model": "gpt-3.5-turbo-0613",
        "llm_completions_0_finish_reason": "stop",
        "llm_completions_0_role": "assistant",
        "llm_completions_0_content": "The division of 62 by 11 is equal to 5.636363636363637.",
        "llm_usage_total_tokens": 33,
        "llm_usage_completion_tokens": 20,
        "llm_usage_prompt_tokens": 13
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "/Users/fabian/miniconda3/envs/monitoring/bin/uvicorn"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b115aada193ec80e0989"
    },
    "name": "POST /api/completion_request/",
    "context": {
        "trace_id": "0xf620ef8f01b73ffe06aee58d71ff4b5a",
        "span_id": "0x44891f8c4fa61aa7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.SERVER",
    "parent_id": null,
    "start_time": "2023-11-28T09:21:24.129052Z",
    "end_time": "2023-11-28T09:21:25.267820Z",
    "status": {
        "status_code": "OK"
    },
    "attributes": {
        "http_scheme": "http",
        "http_host": "127.0.0.1:8001",
        "net_host_port": 8001,
        "http_flavor": "1.1",
        "http_target": "/api/completion_request/",
        "http_url": "http://127.0.0.1:8001/api/completion_request/?prompt=What is 62/11&model=openai&project__id=03f76e31-3c3e-4d8f-a6b6-3f999ecb7f35",
        "http_method": "POST",
        "http_server_name": "127.0.0.1:8001",
        "http_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "net_peer_ip": "127.0.0.1",
        "net_peer_port": 49948,
        "http_route": "/api/completion_request/",
        "prompt": "What is 62/11",
        "access_token": "c6ae5d46295db5c13a5c4f8c344cf59114d2cf5224ad8af94b2fa4e1155a7b62",
        "id": "chatcmpl-8PoZQcRrLwFUGHrFJfiq9xZFQVDLU",
        "object": "chat.completion",
        "created": 1701163284,
        "model": "gpt-3.5-turbo-0613",
        "index": 0,
        "role": "assistant",
        "content": "The division of 62 by 11 is equal to 5.636363636363637.",
        "finish_reason": "stop",
        "prompt_tokens": 13,
        "completion_tokens": 20,
        "total_tokens": 33,
        "response": "{'id': 'chatcmpl-8PoZQcRrLwFUGHrFJfiq9xZFQVDLU', 'object': 'chat.completion', 'created': 1701163284, 'model': 'gpt-3.5-turbo-0613', 'choices': [{'index': 0, 'message': {'role': 'assistant', 'content': 'The division of 62 by 11 is equal to 5.636363636363637.'}, 'finish_reason': 'stop'}], 'usage': {'prompt_tokens': 13, 'completion_tokens': 20, 'total_tokens': 33}}"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b115aada193ec80e098a"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xf620ef8f01b73ffe06aee58d71ff4b5a",
        "span_id": "0x0ae475e2a747be4b",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x44891f8c4fa61aa7",
    "start_time": "2023-11-28T09:21:25.268805Z",
    "end_time": "2023-11-28T09:21:25.269546Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "http_status_code": 200,
        "type": "http.response.start"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
},
{
    "_id": {
        "$oid": "6565b115aada193ec80e098b"
    },
    "name": "POST /api/completion_request/ http send",
    "context": {
        "trace_id": "0xf620ef8f01b73ffe06aee58d71ff4b5a",
        "span_id": "0xc4ca137f37d610b7",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": "0x44891f8c4fa61aa7",
    "start_time": "2023-11-28T09:21:25.269942Z",
    "end_time": "2023-11-28T09:21:25.270045Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {
        "type": "http.response.body"
    },
    "events": [],
    "links": [],
    "resource": {
        "attributes": {
            "service_name": "llm-monitoring"
        },
        "schema_url": ""
    }
}]