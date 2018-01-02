import uuid

def generate_session_id():
    '''
    Generates universally unique id for cookie

    Returns: 
        (str): A UUID string

    '''
    return str(uuid.uuid1())

def get_or_none(model, *args, **kwargs):
    '''
    Wrapper function to ensure get queries do not fail
    '''
    try:
        return model.objects.get(*args, **kwargs)
    except model.DoesNotExist:
        return None