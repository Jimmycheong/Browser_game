import uuid

def generate_session_id():
    '''
    Generates universally unique id for cookie

    Returns: 
        (str): A UUID string

    '''
    return str(uuid.uuid1())